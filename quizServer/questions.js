/**
 * questions.js
 * function prefix:
 * author: Bu Sun Kim
 *
 * This is a module that exposes access to the python QuestionGenerator.py script.
 * Given a file path, it generates questions from that file and returns a
 * string in JSON format.
 *
 * Usage:
 * node questions.js
 *
 * Output:
 * String of questions/answers generated using RAKE keyword extraction.
 */


/**
 * This function calls QuestionGenerator.py with one command line argument containing
 * the file path. It returns a string of questions and answers in the JSON format
 * specified in JSONstandards.md.
 *
 * @param filepaths - Paths to the files with questions as an array of strings.
 * @returns questionsString - Questions and answers formatted in agreed upon JSON format.
 */
var process = require('process');

function generateQuestions(filepaths) {
    process.chdir(__dirname);

    return new Promise(function (resolve, reject) {
        var execFile = require('child_process').execFile;
        var py = execFile('python', ['QuestionGenerator/QuestionGenerator.py'].concat(filepaths), function (e, questionsString, stderr) {
            if (e instanceof Error) {
                console.error("PYTHON-STDERR: "+ stderr);
                reject(e + "\n" + stderr);
            }
            else {
                resolve(questionsString); //should be delivered on stdout if all went well
            }
        });
    });

}

module.exports.generateQuestions = generateQuestions;
