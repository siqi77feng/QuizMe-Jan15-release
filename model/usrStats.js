var users = require('./user.js');
var documents = require('./documents.js');
var survey = require('./survey.js');
var tutorialUser = require('./tutorialUser.js');
var tutorial = require('./tutorial.js');
var db = require('../db/db.js');

function generate_stats() {

    return new Promise(function (resolve, reject) {
        var Users = db.get().users;
        var Documents = db.get().documents;
        var TutorialUser = db.get().survey;
        var Tutoiral = db.get().tutorial;
        var fs = require('fs');

        function get_doc_id() {
            Documents.distinct("docID", function (err, unique_docID) {
                var buffer = [" ", "identiKey, subject, consent, number of logins, docID, correctly answered, incorrectly answered, start time, end time\n"];
                for (var i = 0; i < unique_docID.length; i++) {
                    get_identikeys(unique_docID[i], buffer, unique_docID.length);
                }
            });
        }

        function get_identikeys(docID, buffer, distinct_ids) {
            Documents.find({ docID: docID }, { _id: 0, docID: 0, anwsercredit: 0, date: 0 }).toArray(function (err, res) {
                get_subject(docID, res[0].identikey, buffer, distinct_ids);
            });
        }

        function get_subject(docID, identikey, buffer, distinct_ids) {
            Tutoiral.find({ identikey: identikey }, { _id: 0, firstName: 0, lastName: 0, oneWeekEmail: 0, date: 0 }).toArray(function (err, res) {
                get_logins(docID, identikey, res[0].subject, buffer, distinct_ids);
            });
        }

        function get_logins(docID, identikey, subject, buffer, distinct_ids) {
            Users.find({ _id: identikey }, { _id: 0 }).toArray(function (err, res) {
                get_correct(docID, identikey, subject, res[0].login_count, buffer, distinct_ids);
            });
        }

        function get_correct(docID, identikey, subject, login_count, buffer, distinct_ids) {
            Documents.find({ identikey: identikey, docID: docID, anwsercredit: 'correct' }).count(function (err, correct) {
                get_incorrect(docID, identikey, subject, login_count, correct, buffer, distinct_ids);
            });
        }

        function get_incorrect(docID, identikey, subject, login_count, correct, buffer, distinct_ids) {
            Documents.find({ identikey: identikey, docID: docID, anwsercredit: 'incorrect' }).count(function (err, incorrect) {
                get_start_time(docID, identikey, subject, login_count, correct, incorrect, buffer, distinct_ids);
            });
        }

        function get_start_time(docID, identikey, subject, login_count, correct, incorrect, buffer, distinct_ids) {
            Documents.find({ docID: docID, identikey: identikey }, { sort: { date: 1 } }).toArray(function (err, res) {
                get_end_time(docID, identikey, subject, login_count, correct, incorrect, res[0].date, buffer, distinct_ids);
            });
        }

        function get_end_time(docID, identikey, subject, login_count, correct, incorrect, start_time, buffer, distinct_ids) {
            Documents.find({ docID: docID, identikey: identikey }, { sort: { date: -1 } }).toArray(function (err, res) {
                get_consent(docID, identikey, subject, login_count, correct, incorrect, start_time, res[0].date, buffer, distinct_ids)
            });
        }
        function get_consent(docID, identikey, subject, login_count, correct, incorrect, start_time, date, buffer, distinct_ids) {
            TutorialUser.find({ identikey: identikey }, { _id: 0, firstName: 0, lastName: 0, goodLearner: 0, goodGrades: 0 }).toArray(function (err, res) {
                construct_stats(docID, identikey, res[0].consent_val, subject, login_count, correct, incorrect, start_time, date, buffer, distinct_ids)
            });
        }

        function construct_stats(docID, identikey, consent_val, subject, login_count, correct, incorrect, start_time, end_time, buffer, distinct_ids) {
            var stats = identikey + ", " + subject + ", " + consent_val + ", " + login_count + ", " + docID + ", " + correct + ", " + incorrect + ", " + start_time + "," + end_time + "\n";
            buffer.push(stats);
            if (buffer.length == distinct_ids + 1) {
                done(buffer);
            }
        }

        function done(buffer) {
            resolve(buffer);
        }

        get_doc_id();

    });
}

module.exports.generate_stats = generate_stats;
