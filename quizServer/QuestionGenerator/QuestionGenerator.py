import argparse
import json
import os
from collections import Counter

import RAKE
import nltk

MIN_CHAR_LENGTH = 4 # minimum number of characters required for a keyword
MAX_KEY_PHRASE_LENGTH = 1  # maximum words in a key_phrase
MAX_NUMBER_KEY_PHRASES = 40  # maximum number of key_phrases (different from number of questions)
MAX_SENTENCES = 25  # maximum number of sentences (again, different from the number of questions generated)
USE_RAKE = True


class Questions:
    def load_text_from_file(self, file_names, tokenization=False):
        """
        Given a filename, return a string of contents or a list of sentences.
        @:param filename The name of the file to load text from.
        @:keyword tokenization If true, return a list of sentences. If false, return a single string.
        @:return string or list of sentences
        """
        source_text = ""
        for file_name in file_names:
            # assume files are in utf-8, but backslash replace them when errors are encountered to allow processing to continue
            # http://python-notes.curiousefficiency.org/en/latest/python3/text_file_processing.html
            for line in open(file_name, encoding="utf-8", errors="backslashreplace"):
                source_text += line
            source_text = ' '.join(source_text.splitlines())  # remove newlines

        if tokenization:
            sent_detector = nltk.data.load("tokenizers/punkt/english.pickle")
            source_text = sent_detector.tokenize(source_text.strip())

        return source_text

    def generate_ner_question(self, question):
        """
        Tag the sentence using the Named Entity Recognition tagger from nltk
        @:param sentence sentence that contains a keyphrase
        @:return tuple (anwser, question) or None if nothing found
        """
        chunked = nltk.ne_chunk(nltk.pos_tag(question.split()))
        answers = self.get_continuous_chunks(chunked)
        idx = 0
        keys = []
        if answers:
            for a in answers:
                new_question = question.replace(a, '[[' + str(idx) + ']]')
                # because there is a possibility of overlapping answers, some anwswers might not exist by this time
                if new_question != question:
                    question = new_question
                    idx += 1
                    keys.append(a)
            return keys, question
        else:
            return None

    def get_continuous_chunks(self, chunked):
        """
        Extract all relative information out of the Tree created by ne_chunk
        @param: chunked Tree retruned from the ne_chunk function
        @return: list of tagged values located by traversing the Tree
        """
        continuous_chunk = []
        current_chunk = []
        for subtree in chunked:
            if isinstance(subtree, nltk.Tree):
                current_chunk.append(" ".join([token for token, pos in subtree.leaves()]))
            elif current_chunk:
                named_entity = " ".join(current_chunk)
                if named_entity not in continuous_chunk:
                    continuous_chunk.append(named_entity)
                    current_chunk = []
            else:
                continue
        return continuous_chunk

    def get_nouns(self, stoplist, text):
        """
        An alternate method for extracting length 1 keywords. This searches for NNs, NNPs, and NNS,
        which are nouns, proper nouns, and plural nouns, respectively using the nltk tokenizer.
        Any commonly occuring nouns which are in the stoplist are thrown out.
        :param stoplist: path to a .txt file with words not to treat as keywords
        :param text: a string of all the text to be analyzed
        :return: a list of keyword strings
        """
        noun_tags = ["NN", "NNP", "NNS"]
        # common nouns that usually aren't keywords possibly in the future add words that have been determined through machine learning
        # for now, add words that seem like they'd been unhelpful most of the time
        stop_words = []
        for line in open(stoplist):
            stop_words.append(line.strip())

        tokenized_text = nltk.word_tokenize(text)
        nouns = [word for word, tag in nltk.pos_tag(tokenized_text) if tag in noun_tags and word not in stop_words]
        most_common_nouns = [noun for noun, count in Counter(nouns).most_common(MAX_NUMBER_KEY_PHRASES)]

        return most_common_nouns

    def get_RAKE_keyphrases(self, stoplist, text):
        """
        Extract the key phrases using RAKE from text using the stoplist.
        :param text: String of text to extract keyphrases from
        :param stoplist: file name of stop list
        :return: list of key phrases meeting criterion
        """
        Rake = RAKE.Rake(stoplist)  # initialize key_phrase extractor using the SmartStoplist
        key_phrases = Rake.run(text)

        key_phrases = [k for (k, weight) in key_phrases
                       if len(k.split()) <= MAX_KEY_PHRASE_LENGTH and len(k) >= MIN_CHAR_LENGTH]
        return key_phrases[0:MAX_NUMBER_KEY_PHRASES + 1]  # only return as many as requested

    def generate_questions(self, file_names, use_rake=True):
        """
        Take a list of sentences and key phrases from those sentences and generate questions in JSON format.
        :param sentences: List of sentences.
        :param key_phrases: List of key phrases
        :return: JSON formatted sentence/answer pairs
        """

        text = self.load_text_from_file(file_names)
        word_count = len(text.split())  # this is an approximation of "true" word count
        sentences = self.load_text_from_file(file_names, tokenization=True)
        stoplist_dir = os.path.dirname(__file__)
        stoplist_path = os.path.join(stoplist_dir, "SmartStoplist.txt")
        if use_rake:
            key_phrases = self.get_RAKE_keyphrases(stoplist_path, text)
        else:
            key_phrases = self.get_nouns(stoplist_path, text)
        fillInTheBlank = []  # list of dictionaries in format {"sentence":sentence, "keys":[answer1, answer2, ...]}
        for sentence in sentences:
            ner_sentence = sentence
            keys = []
            found = False
            i = 0  # indexing for sentences with multiple key phrases
            for key_phrase in key_phrases:  # for top ranked key_phrases
                if key_phrase in sentence:
                    key_phrase_length = len(key_phrase.split())
                    sentence_length = len(sentence.split())
                    # make sure the key phrase is shorter than remaining words in sentence
                    if (sentence_length - key_phrase_length) > key_phrase_length + 1:
                        found = True
                        sentence = sentence.replace(key_phrase, '[[' + str(i) + ']]')
                        keys.append(key_phrase)
                        i += 1
            if found:
                new_sentence = {"sentence": sentence, "keys": keys}
                fillInTheBlank.append(new_sentence)
                ner_results = self.generate_ner_question(ner_sentence)
                if ner_results is not None:
                    ner_answers = ner_results[0]
                    ner_question = ner_results[1]
                    new_question = {"sentence": ner_question, "keys": ner_answers}
                    fillInTheBlank.append(new_question)
        fillInTheBlank = sorted(fillInTheBlank, key=lambda x: len(x["keys"]), reverse=True)[
                         :MAX_SENTENCES + 1]  # prefer sentences with lots of keys
        fillInTheBlankQuestions = json.dumps({"fillInTheBlank": fillInTheBlank})
        # fillInTheBlankQuestions = json.dumps({"fillInTheBlank": fillInTheBlank, "wordCount": word_count})
        return fillInTheBlankQuestions


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("files", nargs="+")
    opts = parser.parse_args()

    questions = Questions().generate_questions(opts.files, use_rake=USE_RAKE)
    print(questions)  # send to sys.stdout for Node.js
