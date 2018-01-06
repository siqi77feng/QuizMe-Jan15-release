from unittest import TestCase
from QuestionGenerator.QuestionGenerator import Questions
from unittest.mock import MagicMock
import json
import os
from os.path import dirname


class TestQuestions(TestCase):
    def setUp(self):
        self.test_file = ["test/test.txt"]
        self.maxDiff = None

    def test_load_text_from_file_no_tokenization(self):
        questions = Questions()
        source_text = questions.load_text_from_file(self.test_file)
        text = "This is the first sentence. This is the second sentence. This is the last sentence which has the word sentence twice."
        self.assertEqual(source_text, text)

    def test_load_text_from_file_with_tokenization(self):
        questions = Questions()
        source_text = questions.load_text_from_file(self.test_file, tokenization=True)
        text = ["This is the first sentence.", "This is the second sentence.",
                "This is the last sentence which has the word sentence twice."]
        self.assertEqual(source_text, text)

    def test_get_RAKE_keyphrases(self):
        stoplist = os.path.join(dirname(dirname(__file__)), 'QuestionGenerator/SmartStoplist.txt')
        text = "There are a few stopwords in this sentence that should result in key phrases being found."
        questions = Questions()
        keyphrases = questions.get_RAKE_keyphrases(stoplist, text)
        self.assertNotEqual([], keyphrases)
        self.assertEqual({'found', 'stopwords', 'sentence', 'result'}, set(keyphrases))

    def test_generate_questions(self):
        expected_questions = """{"fillInTheBlank": [{"sentence": "This is the first [[0]].", "keys": ["sentence"]},
                                {"sentence": "This is the second [[0]].", "keys": ["sentence"]},
                                {"sentence": "This is the last [[0]] which has the word [[0]] twice.",
                                "keys": ["sentence"]}]}
                                """
        questions = Questions()
        generated_questions = questions.generate_questions(self.test_file, use_rake=True)
        print("generated:", generated_questions)
        print(expected_questions)
        self.assertEqual(json.loads(generated_questions), json.loads(expected_questions))
