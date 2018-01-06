var express = require('express');
var bodyParser = require('body-parser'); // needed in Express 4 to handle JSON objects from POST requests
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var helmet = require('helmet');
var ocr = require('./quizServer/OCR.js');
var pdftojpeg = require('./quizServer/pdftojpeg');
var questionGenerator = require('./quizServer/questions.js');
var db = require('./db/db.js');
var Documents = require('./model/documents.js');
var Users = require('./model/user.js');
var Stats = require('./model/usrStats.js');
var Survey = require('./model/survey.js');
var tutorialSurvey = require('./model/tutorial.js');
var tutorialUser = require('./model/tutorialUser.js');
var finished = require('./model/finished.js');
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'web')));
app.use(bodyParser.urlencoded({ extended: false }));

db.connect('mongodb://localhost:27017/quizme', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        //process.exit(1);
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'web/index.html'));
});

app.post('/upload', function(req, res) {

    var doc_index = db.get().document_index;

    doc_index.findOneAndUpdate({},{$inc: {index: 1}},{returnOriginal: true, upsert: false}, function(err, db_res){

        var newDocID = db_res.value.index;

        var form = new formidable.IncomingForm();

        form.uploadDir = path.join(__dirname, '/uploads');

        form.on('file', function(field, file) {
            var upload_file_path = path.join(form.uploadDir, file.name);
            fs.rename(file.path, path.join(upload_file_path));
            console.log("BACKEND: file received: " + file.name);

            // Handle the files depending on their extensions
            var ext = file.name.substr(file.name.lastIndexOf('.')+1).toLowerCase();
            // TEXT
            if (ext==="txt" || ext==="text") {
                console.log("BACKEND: received text file");
                questionGenerator.generateQuestions(upload_file_path)
                    .then(function(result){
                        // Attach the docID to the quiz data being returned
                        var docID_with_result = '{"docID": "' + newDocID + '", ' + result.slice(1);
                        console.log(docID_with_result);
                        res.status(200).send(docID_with_result);
                    })
                    .catch(function(err){
                        res.status(500).send({error: err});
                    });
                // IMAGE
            } else if (ext==="jpg" || ext==="jpeg" || ext==="png" || ext==="bmp" || ext==="gif") {
                console.log("BACKEND: received image file");
                ocr.OCR_getResults([upload_file_path], function(err, results) {
                    // This is a callback function that is called after OCR runs.
                    // results - string, parsed text from OCR
                    console.log("Calling back after OCR_getResults()");
                    if (err){
                        console.error("error in OCR: " + err);
                        res.status(500).send({error:err});
                    }
                    else {
                        var txt_file_path = path.join(__dirname, "/quizServer/" + Date.now() + "ocr-results.txt");
                        fs.writeFileSync(txt_file_path, results);
                        questionGenerator.generateQuestions(txt_file_path)
                            .then(function (result) {
                                console.log(result);
                                fs.unlinkSync(txt_file_path); // Deletes ocr-results.txt
                                // Attach the docID to the quiz data being returned
                                var docID_with_result = '{"docID": "' + newDocID + '", ' + result.slice(1);
                                res.status(200).send(docID_with_result);
                            })
                            .catch(function (err) {
                                console.error(err);
                                res.status(500).send({error: err});
                            });
                    }
                });
                // PDF
            } else if (ext==="pdf") {
                console.log("BACKEND: received pdf file");
                pdftojpeg.pdftojpeg(upload_file_path, true, function(files){
                    console.log("Calling back after pdf conversion");
                    ocr.OCR_getResults(files, function(err, results) {
                        // This is a callback function that is called after OCR runs.
                        // results - string, parsed text from OCR
                        console.log("Calling back after OCR_getResults()");
                        if (err){
                            console.error("error in OCR: " + err);
                            res.status(500).send({error:err});
                        }
                        else {
                            var txt_file_path = path.join(__dirname, "/quizServer/" + Date.now() + "ocr-results.txt");
                            fs.writeFileSync(txt_file_path, results);
                            questionGenerator.generateQuestions(txt_file_path)
                                .then(function (result) {
                                    console.log(result);
                                    fs.unlinkSync(txt_file_path); // Deletes ocr-results.txt
                                    // Attach the docID to the quiz data being returned
                                    var docID_with_result = '{"docID": "' + newDocID + '", ' + result.slice(1);
                                    res.status(200).send(docID_with_result);
                                })
                                .catch(function (err) {
                                    console.error(err);
                                    res.status(500).send({error: err});
                                });
                        }

                    });
                });
            }
            else {
                console.error('Error: Unsupported file type. Accepted file types: .txt, .jpg, .png, .bmp, .gif, .pdf');
                res.status(500).send({error: 'Error: Unsupported file type. Accepted file types: .txt, .jpg, .png, .bmp, .gif, .pdf'});
            }
        });

        form.on('error', function(err) {
            console.error('error has occured: \n' + err);
            res.status(500).send({error: err});
        });

        form.parse(req);
    });
});
app.post('/uploadText', function(req, res) {
    console.log("BACKEND: pastedText received:");
    console.log(req.body);

    // Generate new docID for the uploaded text
    var doc_index = db.get().document_index;
    doc_index.findOneAndUpdate({},{$inc: {index: 1}},{returnOriginal: true, upsert: false}, function(err, db_res){
        var newDocID = db_res.value.index;
        // Create the file
        var upload_file_path = path.join(__dirname, "/quizServer/uploads/" + Date.now() + "pasted-text.txt");
        buffer = new Buffer(req.body.pastedText);
        fs.open(upload_file_path, 'wx', function(err, fd) {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log("BACKEND: could not create file for pasted text, because file already exists");
                    console.log(err);
                    res.status(500).send({error: err});
                    return;
                }
                console.log("BACKEND: could not create file for pasted text");
                console.log(err);
                res.status(500).send({error: err});
                throw err;
            }
            // Write the pasted text to the file
            fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                if (err) {
                    console.log("BACKEND: error writing file for uploadText");
                    console.log(err);
                    throw 'error writing file: ' + err;
                }
                fs.close(fd, function() {
                    console.log('BACKEND: file successfully written for uploadText');
                    // Generate questions from the recently-written file
                    questionGenerator.generateQuestions(upload_file_path)
                        .then(function(result){
                            // Attach the docID to the quiz data being returned
                            var docID_with_result = '{"docID": "' + newDocID + '", ' + result.slice(1);
                            console.log(docID_with_result);
                            res.status(200).send(docID_with_result);
                        })
                        .catch(function(err){
                            res.status(500).send({error: err});
                        });
                })
            });
        });
    });
});

app.post('/getQuiz', function(req, res){
    console.log("BACKEND: received request for pregenerated quiz");

    var doc = db.get().documents;
    doc.find({},{_id: 0, identikey: 0, anwsercredit: 0, date: 0}).sort({ docID: -1 }).toArray(function(err, db_res){

        // Determine the new unique docID
        var newDocID = 0;
        var numeric_regex = /[0-9]+/;
        for (var i=0; i<db_res.length; i++) {
            var tempDocID = db_res[i].docID;
            if (numeric_regex.test(tempDocID)) {
                var tempDocIDNum = parseInt(tempDocID,10);
                if (tempDocIDNum == NaN) {
                    continue;
                }
                if (newDocID<=tempDocIDNum) {
                    newDocID = tempDocIDNum + 1;
                }
            }
        }
        // At this point, newDocID is a docID entirely unique to the database of docIDs

        var chapter = req.body.chapter;
        var identikey = req.body.identikey;
        fs.readFile(path.join(__dirname, 'pregeneratedQuizzes', chapter + ".txt"), function (err, result){
            if (err){
                res.status(500).send({error: err});
                throw err;
            }
            var docID_with_result = '{"docID": "' + newDocID + '", ' + result.slice(1);
            res.status(200).send(docID_with_result);
        });
    });
});

// Collecting resesarch data
app.post('/oneAnswerData', function(req, res) {
    console.log("BACKEND: oneAnswerData received:");
    console.log(req.body);
    var ret = Documents.update(req.body);
    if (ret == 0) {
        console.log("BACKEND: finished updating DOCUMENTS");
        res.sendStatus(200);
    } else {
        console.log("BACKEND: could not update DOCUMENTS");
        res.sendStatus(404);
    }
});

app.post('/updateUserInfo', function(req, res){
    console.log("BACKEND: userData received:");
    console.log(req.body);

    Users.update(req.body,function(result){

        if (result == 0) {
            console.log("BACKEND: finished updating USERS");
            res.sendStatus(200);
        } else {
            console.log("BACKEND: User not found");
            res.status(404).send({error: 'Error: Could not locate give identikey'});
        }

    });
});

//use the returnID to get the user's identikey and subject
// This is then returned to the user 
app.get('/returnId=:code', function (req, res) {
    var testcode = req.params.code;
    //get code from url might be able to use something else but this approach was initally taken to facilitate email links but that isn't currently working
    console.log("code = " + testcode);
    //res.body = { identikey: "guest", subject: "sports" };
    //console.log(res.body)
    var info = db.get().tutorial;
    //console.log(info);
    //Get info about user using the returnID to get info from tutorial collection
    info.find({ "identikey": testcode }, { "_id": 0, "identikey": 1, "subject": 1, "firstName": 1, "lastName": 1, "n" : 1 }).toArray(function (err, result) {
        console.log(result);
        if (err) {
            console.log("Something has gone wrong");
            res.status(500).send({ error: 'Error: Could not locate give return key' });
        }
        else
            if (result) {
                //Return the identikey and result
                res.status(200).json(result);
            }
            else {
                res.status(500)
            }
    });
    //var sendBack = '{ "identikey" : "guest", "subject" : "Sports" }'
    //res.status(200).send(sendBack);
});


// Getting research data
app.get('/userStatistics',function(req, res){
    console.log("BACKEND: compiling user statistics");
    Stats.generate_stats()
        .then( function(buffer){
            fs.writeFile("./stats.csv",buffer,(err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            res.download('./stats.csv');
        });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send({error: err});
        });

});

app.post('/surveyResults', function(req,res){
    console.log("BACKEND: survey results received:");
    console.log(req.body);
    Survey.update(req.body);
    res.sendStatus(200);
});
app.post('/finishedDayThree', function (req, res) {
    console.log("BACKEND: Day 3 received:");
    console.log(req.body);
    finished.update(req.body);
    res.sendStatus(200);
});
app.post('/tutorialSurvey', function(req,res){
    console.log("BACKEND: survey results received:");
    console.log(req.body);
    tutorialSurvey.update(req.body);
    res.sendStatus(200);
});
app.post('/tutorialUser', function (req,res) {
    console.log("BACKEND: userData received:");
    console.log(req.body);
    tutorialUser.update(req.body);
    res.sendStatus(200);

});
app.listen(8080, function() {
    console.log('QuizMe Server Running');
});
