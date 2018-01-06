/**
 * Created by busun on 1/29/17.
 * Tests for OCR.js
 */
var assert = require('assert');
var path = require('path');
var OCR = require('../OCR.js');

describe('OCR', function () {
    describe('#get_OCR_results_single', function () {
        var result = "";

        before(function (done) {
            OCR.OCR_getResults([path.join(__dirname, 'test001.jpg')],
                function (err, OCR_text) {
                    result = OCR_text;
                    done();
                })
        });

        it('it should get text from one image file', function () {
            var text = ' this is one test file for OCR. ';
            assert.equal(result, text);
            assert.notEqual(result, " ");
            assert.notEqual(result, "this should not match");
        });
    });

    describe('#get_OCR_results_multiple', function () {
        var result = "";

        before(function (done) {
            OCR.OCR_getResults([path.join(__dirname, 'test001.jpg'), path.join(__dirname, 'test002.jpg')],
                function (err, OCR_text) {
                    result = OCR_text;
                    done();
                })
        });
        it('it should get text from multiple image files', function () {
            var text = ' this is one test file for OCR.  this is a second test file for OCR. ';
            assert.equal(result, text);
            assert.notEqual(result, " ");
            assert.notEqual(result, "this should not match either");
        });
    });

});

