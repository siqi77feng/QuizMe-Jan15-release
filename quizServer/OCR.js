/**
 * OCR.js
 * function prefix: OCR
 * author: Bu Sun Kim
 *
 * This is a module that uses Microsoft Cognitive Services Computer Vision API
 * to conduct OCR on image files (https://dev.projectoxford.ai/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fc).
 * Given a list of file path(s) to image file(s), it returns the text in the image(s) as a string.
 *
 * Usage:
 * var OCR = require('OCR.js');
 * OCR.OCR_getResults(['path/to/file1', 'path/to/file2'], callback);
 * (environment variable OCP_APIM_SUBSCRIPTION_KEY needs to be set to the API key from Microsoft)
 * Output:
 * String of text in an image.
 */

'use strict';

var request = require('request');
//require('request').debug = true;
var fs = require('fs');


function OCR_createUrl() {
    var url = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr/';
    var parameters = {
        'detectOrientation': 'true',
        'language': 'unk'
    };

    return url + '?language=' + parameters.language + '&detectOrientation =' + parameters.detectOrientation;
}


function OCR_getText(json_string) {
    /*
     This function takes the JSON returned from the Computer Vision API and appends the text
     together to form one string.

     @param json_string - JSON response from Computer Vision API.
     */
    var json_obj = JSON.parse(json_string);
    var text = "";
    for (var i = 0; i < json_obj.regions.length; i++) {
        var region = json_obj.regions[i];
        for (var j = 0; j < region.lines.length; j++) {
            var line = region.lines[j];
            for (var k = 0; k < line.words.length; k++) {
                var words = line.words[k];
                text = text + " " + words.text;
            }
        }
    }

    return text;
}


function OCR_getResult(file_path, callback) {
    /*
     This function calls the Microsoft Computer Vision API with an image stream.
     The text in the image is returned as a string.

     @param file_paths - Path to the image file.
     */
    fs.createReadStream(file_path).pipe(request({
        url: OCR_createUrl(),
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY // set API key as an environment variable (e.g., in ~/.bashrc)
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(null, body);

        } else {
            callback(body);

        }
    }));
}

function OCR_waterfallOver(list, iterator, callback) {
    /*
     https://mostafa-samir.github.io/async-iterative-patterns-pt1/
     This is a helper function to insure that file paths are
     called in the order they exist in the list

     @param list - list to be iterated over
     @param iterator - function executed for each iteration
     @ callback - final callback to be executed after all iterations
     */
    var nextItemIndex = 0;

    function report() {
        nextItemIndex++;
        if (nextItemIndex == list.length)
            callback();
        else
            iterator(list[nextItemIndex], report);
    }

    iterator(list[0], report);
}

function OCR_getResults(file_paths, callback) {
    /*
     This function collects OCR results for all the file_paths.

     @param file_paths - list of file path(s)
     */
    var finalResult = "";
    OCR_waterfallOver(file_paths, function (file_path, report) {
        OCR_getResult(file_path, function (err, data) {
            if (err) {
                callback(err);
                return;
            }
            else {
                finalResult += OCR_getText(data) + " ";
                report();
            }

        });
    }, function () {
        callback(null, finalResult);
    })

}

module.exports.OCR_getResults = OCR_getResults;


