/* quiz.js */
/* Authors: Ryan Tabler, Spencer Wilson */
/* This is included from quiz.html, and contains all of the JavaScript (and Angular) code for the quiz interface. */

var filename;
var questions;

/* Overlay controller */
var processing = function(isProcessing) {
    if ( isProcessing ) {
        document.getElementById('processing').innerHTML = `
            <div aria-hidden="true" class="spinningWheel">
                <i class="fa fa-spinner fa-5x fa-pulse fa-inverse" aria-hidden="true"></i>
            </div>
        `;
    } else {
        document.getElementById('processing').innerHTML = ""
    }
    return;
}

$('.upload-btn').on('click', function () {
    $('#upload-input').click();
});
$('#upload-input').off('change').on('change', function() {

    /* Start overlay */
    processing(true)

    //Check for .txt extension
    var fileSelect = document.getElementById('upload-input');
    for (var i=0; i<fileSelect.files.length; i++) {

        filename = fileSelect.files[i].name;
        var ext = fileSelect.files[i].name.substr(fileSelect.files[i].name.lastIndexOf('.')+1).toLowerCase();
        var file_size = fileSelect.files[i].size;

        if (!(ext==="txt" || ext==="text" || ext==="jpg" || ext==="jpeg"
            || ext==="png" || ext==="bmp" || ext==="gif" || ext=="pdf")) {
            
            alert('Error: Unsupported file type. Accepted file types: .txt, .jpg, .png, .bmp, .gif, .pdf');
            processing(false);
        } else if (file_size > 10000000){
            alert('Error: File is too large. Please make sure that file is less then 10 MB')
            processing(false);
        } else if ((ext==="jpg" || ext==="jpeg"
            || ext==="png" || ext==="bmp" || ext==="gif") && file_size > 4000000){
            alert("Error: Image file is too large. Please make sure that image files (.jpg, .jpeg, .png, .bmp, .gif) are less than 4 MB")
            processing(false);
        }
        else {

            var file = $(this).get(0).files;

            if (file.length > 0) {

                var formData = new FormData();
                formData.append('uploads[]', file[i], file[i].name);

                $.ajax({
                    async: true,
                    url: './upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        //delete:
                        // Assign the returned data to 'questions'
                        console.log('upload successful!\n');
                        console.log("DATA RETURNED: "+data);
                        questions = data;
                        // Redirect to the quiz page.
                        // Normally, this should redirect after every file is uploaded,
                        // but for now, for the demo, this will link after 1 file completely handled.
                        window.location.href = "#quiz";
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                        //replace the console.log with redirect to error page
                        console.error(errorThrown + ": " + XMLHttpRequest.responseText);
                        processing(false);
                    },
                    xhr: function() {
                        var xhr = new XMLHttpRequest();

                        xhr.upload.addEventListener('progress', function(evt) {
                            if(evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);
                                console.log(percentComplete);
                            }
                        }, false);

                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == XMLHttpRequest.Done) {
                                //questions = xhr;
                            }
                        }
                        return xhr;
                    }
                });
            } else {
                alert('File size must be positive');
                processing(false);
            }
              

        }

    }
    // This should redirect to a page that will
    // show the status of the upload, OCR, and question generation.
    //window.location.href = "#wait";

});


var requestCh = function(chId,chTitle,identikey) {

    filename = chTitle;
    var request = '{"chapter": "'+chId+'", "identikey": "'+identikey+'"}'
    $.ajax({
        type: "POST",
        url: './getQuiz',
        contentType: "application/json",
        data: request,               
        dataType: false,
        success: function(data){
            console.log('Chapter request successful!\n' + data);
            questions = data;
            window.location.href = "#quiz";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            processing(false);
            //replace the console.log with redirect to error page
            console.error(errorThrown + ": " + XMLHttpRequest.responseText);
        }
    });
    return;
};

(function(){
    angular.module('quizMeApp')
    .controller('QuizCtrl',
        ['$scope','$location','myService',
        function QuizCtrl( $scope, $location, myService ) {
            'use strict';
            $scope.meta = {
                title: "Quiz Page"
            };
            
            /* 
             * Variable declarations
             */
            // Identifier variables
            var n = myService.n;
            var myIdentiKey, myDocName, myDocID, myfirstName, mylastName;
            // State variables
            var currentQuestionIndex, currentQuestion;
            var answerCorrect, usedHint, showFeedback;
            // Quiz logic variables
            var questionBank, allGeneratedQuestions, questionQueue; 
            var correctMap, incorrectMap, discardMap;
            var answerChecked, submittedAnswer, mispelled, hintAvailable, discardable,Counter;
            var wrongStreak, wrongStreakLimit; // used as redundancy in magic 7 integration
            var threshold; // used to alter how often we remove correctly answered questions
            // Functions to give the HTML access to important variables
            $scope.answerChecked = function() { return answerChecked; }
            $scope.answerCorrect = function() { return answerCorrect; }
            $scope.showFeedback = function() { return showFeedback; }
            $scope.usedHint = function() { return usedHint; }
            $scope.mispelled = function() { return mispelled; }
/*
            $scope.ng-click="btFinishQuiz()" = function () {
                if(arr.length == 10) {

                    window.location.href = "#finishedQuiz"
                    return true;
                }
                return false;
            }
*/






            // Called at end of file to initialize environment after all fuctions loaded
            var init = function(){
                
                // Scroll to top where the quiz interface is
                document.body.scrollTop = document.documentElement.scrollTop = 0;

                // Pull data from JSON
                var questionBank;
                if (myService.questionsGenerated) {
                    console.log("Restarting quiz (or starting quiz from pasted text, with current implementation)");
                    // Quiz questions have already been generated,
                    // and someone is restarting a quiz they took
                    questionBank = JSON.parse(myService.questions);
                    myService.docID = questionBank.docID;
                } else if (!(questions===undefined || questions==="")) {
                    console.log("Starting quiz");
                    // Quiz questions have just been generated,
                    // so use those and store them for later
                    myService.docName = filename;
                    myService.questions = questions;
                    myService.questionsGenerated = true;
                    questionBank = JSON.parse(questions);
                    myService.docID = questionBank.docID;
                    filename = "";
                    questions = "";
                } else {
                    console.log("Redirecting to startAQuiz");
                    // No questions have been generated anywhere.
                    // User probably just entered this URL, or refreshed.
                    window.location.href = "#startAQuiz";
                    return;
                }

                // Send pageview
                ga('set', 'page', '/quiz-start');
                ga('send', 'pageview');
                console.log("Google Analytics pageview sent: /quiz-start");

                // Pull out identifiers
                myIdentiKey = myService.identiKey;
                myfirstName = myService.firstName;
                mylastName = myService.lastName;
                myDocName = myService.docName;
                $scope.myDocName = myDocName;
                myDocID = myService.docID;

                // Initialize research data variables
                myService.numIncorrect = 0;
                myService.numPartial = 0;
                myService.numCorrectINA = 0;
                myService.numCorrectINB = 0;
                myService.numTossed = 0;
                myService.numCorrectReturn=0
                myService.APercent = 0;
                myService.BPercent = 0;
                correctMap = [];
                incorrectMap = [];
                discardMap = [];

                // Initialize quiz functionality variables
                wrongStreak = 0;
                wrongStreakLimit = 3;
                threshold = 1.0;
                
                // Generate the questions that will be presented to the user.
                // Plan out the ordering in which those questions will be asked
                // for all sentence objects.
                allGeneratedQuestions = []; // Contains generated question objects
                questionQueue = []; // Contains indices of questions in allGeneratedQuestions
                var qCount = 0;
                for (var qi = 0; qi < questionBank.fillInTheBlank.length; qi++) {
                    // count usage of key terms
                    var countKeyUse = getKeyUse(questionBank.fillInTheBlank[qi].sentence);
                    for (var ai = 0; ai < countKeyUse; ai++){
                        allGeneratedQuestions[qCount] = new Question(questionBank,qi,ai);
                        questionQueue[qCount] = qCount;
                        correctMap[qCount] = 0;
                        qCount++;
                    }
                }

                if (allGeneratedQuestions.length == 0){
                    alert('Error: No questions could be generated from the file you uploaded. Please try another file.');
                    // Set global variables to clear any valid quiz data that was set in startAQuiz
                    // because we know now that what we have is not enough for a quiz.
                    myService.docName = "";
                    myService.questions = "";
                    myService.questionsGenerated = false;
                    myService.docID = -1;
                    window.location.href = "#startAQuiz";
                    return;
                }
                else {
                    // Randomize question ordering
                    //shuffle(questionQueue);

                    // Initialize quiz state variables
                    currentQuestionIndex = 0;
                    currentQuestion;
                    answerChecked = false;
                    usedHint = false;
                    discardable = true;
                    // Initialize status variables
                    showFeedback = false;
                    submittedAnswer = "";
                    answerCorrect = false;
                    mispelled = false;
                    hintAvailable = true;
                    // These variables currently not in use (?)
                    incorrectMap = correctMap; // for initiallizing purposes only
                    discardMap = correctMap; // for initiallizing purposes only

                    // Present the first question
                    presentQuestion();
                }

                return;
            }
            var correctQuestionID = [];

            /*
             * Utility functions called internally
             */
            // Sends data for one answered question to the backend
            var sendOneAnswerData = function(answerCredit) {
                // Create JSON object to send
                var oneAnswerData = {
                    "identiKey":     myIdentiKey,
                    "firstName":      myfirstName,
                    "lastName":      mylastName,
                    "docID":         myDocID,
                    "answerCredit": answerCredit,
                    "correctQuestionID": correctQuestionID,
                    //"numCorrectINA": myService.numCorrectINA,
                    //"numCorrectINB": myService.numCorrectINB,
                    "numCorrectReturn": myService.numCorrectReturn,
                    "APercent":myService.APercent,
                    "BPercent":myService.BPercent

                };
                $.ajax({
                    async: true,
                    url: './oneAnswerData',
                    type: 'POST',
                    data: oneAnswerData,
                    success: function(data) {
                        console.log("FRONTEND oneAnswerData: returned "+data);
                    }
                })
            }

            var arr = [];
            var AID = [];
            var BID = [];

            $(".finishedQuiz-button").hide();
            $(".finishedQuiz-button2").hide();
            $(".finishedQuiz").hide();

            // Sets the right variables to display a question to the HTML
            var presentQuestion = function() {
                if (questionQueue.length === 0) {
                    // No more questions to ask
                    $scope.questionPreBlank = "";
                    $scope.correctAnswer = "";
                    $scope.questionPostBlank = "";
                    //$location.path("#finishedQuiz");
                    window.location.href = "#finishedQuiz";
                    return;
                }
                // Assumptions: questionQueue and currentQuestionIndex are in the desired state
                console.log("Current question index: "+currentQuestionIndex);
                console.log(questionQueue);
                arr.push(currentQuestionIndex);
                console.log(arr);
                console.log(arr.length);
                console.log(correctQuestionID);
                console.log(correctQuestionID.length);
                AID = [];
                BID = [];
                for(var i =0;i<correctQuestionID.length;i++) {
                    if(correctQuestionID[i]%2 !=0)
                    {
                      //  AID = [];
                        AID.push(correctQuestionID[i]);
                        //myService.numCorrectINA += 1;
                    }
                    else
                    {
                        //BID = [];
                        BID.push(correctQuestionID[i]);
                        //myService.numCorrectINB += 1;
                    }
                }

              //  while(i<correctQuestionID.length && n ==1)
               // {
                 //   if (correctQuestionID[i] % 2 != 0) {
                   //     BID.push(correctQuestionID[i])
                    //}
                    //else{
                      //  AID.push(correctQuestionID[i])
                    //}
                //}
                console.log(AID);
                console.log(BID);
                //AID will have the question IDs among in [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
                //BID will have the question IDs among in [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
                myService.APercent=AID.length/10;// % for 1 3 5 7 9 ....19
                myService.BPercent=BID.length/10;// % for 2 4 6 8 10....20
                console.log(myService.APercent);
                console.log(myService.BPercent);
                console.log(n);



                //console.log(allGeneratedQuestions);
                // Get the question from the currentQuestionIndex, and set the HTML
                // to dislay the question and prepare for the user to answer it.
                currentQuestion = allGeneratedQuestions[questionQueue[currentQuestionIndex]];
                $scope.questionPreBlank = currentQuestion.preBlank;
                $scope.correctAnswer = currentQuestion.key;
                $scope.questionPostBlank = currentQuestion.postBlank;
                document.getElementById("answer-box").focus();

                // Send pageview
                ga('set', 'page', '/quiz-question');
                ga('send', 'pageview');
                console.log("Google Analytics pageview sent: /quiz-question");

                return;
            }
            // Increments the current state of the quiz onto the next question.
            var doNextQuestion = function() {
                // Reset UI visuals
                document.getElementById("answer-box").value = "";
                document.getElementById("answer-box").readOnly = false;
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // Cycle to next question logically, then send it to the HTML
                 // Cycles through questionQueue
                currentQuestionIndex= (currentQuestionIndex + 1) % questionQueue.length;
               /* if(currentQuestionIndex >= 9) {
                    $(".check-or-next").click(function () {
                        $(".check-or-next").hide();
                        $(".finishedQuiz-button").show();
                    });
                }
                else{
                    presentQuestion();
                }*/
               //= (currentQuestionIndex + 1) % questionQueue.length; // Cycles through questionQueue
                if((arr.length >= questionQueue.length)&&(questionQueue.length <= 10)) {
                        $(".check-or-next").hide();
                        $(".question-viewer").hide();
                        $(".finishedQuiz-button2").show();
                        $(".finishedQuiz-button2").click(function () {
                            $(".finishedQuiz-button2").hide();
                            $(".finishedQuiz").show();
                        });


                }
                else if((arr.length >= questionQueue.length) && (questionQueue.length <= 20)){
                    $(".check-or-next").hide();
                    $(".question-viewer").hide();
                    $(".finishedQuiz-button").show();


                }
                else {
                    presentQuestion();
                }
                submittedAnswer = "";

            }
            // Gets the submitted answer, checks it for correction, and sets the appropriate variables
            var checkAnswer = function() {
                submittedAnswer = document.getElementById("answer-box").value;

                if(isNaN(submittedAnswer.slice(0,1))) { // Use Spell check if answer does not begin with a number
                    answerCorrect = (Levenshtein.get(submittedAnswer.toLowerCase(), $scope.correctAnswer.toLowerCase())<3); // compares the # of incorrect characters. less than 3 are allowed
                    mispelled = (Levenshtein.get(submittedAnswer.toLowerCase(), $scope.correctAnswer.toLowerCase())>0 && answerCorrect);
                }
                else{
                    answerCorrect = submittedAnswer.toLowerCase() == $scope.correctAnswer.toLowerCase();
                }

                return;
            }


            /* 
             * Functions called from button objects:
             *
             * There are 3 states of the quiz.
             * It goes:  Check -> Retry -> Next  if the user answers incorrectly the first time,
             *       or  Check -> Next           if the user answers correctly the first time.
             * The two variables used to keep track of these states are:
             *   answerChecked -- true if the user has answered the question.
             *   usedHint -- true if the user has answered the question after getting it wrong once.
             * The other important variables are:
             *   showFeedback -- matches answerChecked, but is set at different times to keep from
             *     showing feedback before the answer is evaluated.
             *   discardable -- tells whether a question has been discarded by a correct answer
             * These variables only change inside bt*() functions.
             */
            // Function for the Check/Retry/Next button, which is all the same button, but
            // with different text and functions depending on the state of the quiz.
            $scope.btCheckOrNextOrRetry = function() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if (!answerChecked) {
                    // This question has not yet been answered at all, so we are checking it.
                    // State variables:
                    answerChecked = true;
                    // usedHint is already false, but it will be set to true inside
                    //   btCheck() if the answer is correct,
                    // showFeedback will be set to true to match answerChecked,
                    //   but it will be set after feedback is ready to be shown.
                    // discardable should be true by default, but it may be set
                    //   appropriately in calcFeedback(),
                    discardable = true;
                    btCheck();
                } else {
                    if (!usedHint){
                        // This question has already been answered once, so this is the
                        //   second time we're checking the answer.
                        // State variables:
                        usedHint = true;
                        // answerChecked is already true
                        // showFeedback is already true
                        // discardable should be true by default, but it may be set
                        //   appropriately in calcFeedback()
                        discardable = true;
                        btRetry();
                    } else {
                        // The user has answered the question twice if they got it wrong,
                        //   or once if they got it right. So the user does not have a chance to
                        //   enter another answer, so we should present the next question.
                        // State variables:
                        answerChecked = false;
                        usedHint = false;
                        showFeedback = false;
                        discardable = true;
                        btNext();
                    }
                }
                return;
            }
            var btCheck = function(){
                // Check the answer that the user has entered
                checkAnswer();
                // Determine what feedback is appropriate, and set the HTML to show it
                calcFeedback(submittedAnswer);
                showFeedback = true;

                // If the user answered correctly, mark it as correct and tell the server.
                // If the user answered incorrectly, give them another chance to get it right
                // before recording it to the overall score and telling the server.
                if (answerCorrect) {
                    usedHint = true; // so that the "Next" state is next, instead of the "Retry" state
                    document.getElementById("answer-box").readOnly = true;
                    sendOneAnswerData("correct");
                        myService.numCorrectReturn +=1;

                } else {
                    document.getElementById("answer-box").value = "";
                    document.getElementById("answer-box").focus();
                }
                
                return;
            }
            var btRetry = function(){
                // Check the answer that the user has entered
                checkAnswer();
                // Reset the answer text box
                document.getElementById("answer-box").readOnly = true;
                document.getElementById("answer-box").focus();

                // Determine what feedback is appropriate, and set the HTML to show it
                calcFeedback(submittedAnswer);
                // setting "showFeedback = true;" is redundant because feedback should already
                // be visible

                // Since this is the second time the user is answering the question,
                // a oneAnswerData will always be sent, no matter how they answer
                // (unlike in btCheck() where it is only sent if their answer is correct).
                sendOneAnswerData(answerCorrect ? "correct" : "incorrect");
                // Scorekeeping
                myService.numIncorrect+=1;
                return;
            }
            var btNext = function(){
                // Reset state and status variables accordingly
                answerCorrect = false;
                answerChecked = false;
                usedHint = false;
                hintAvailable = true; // needs to be set correctly for calcFeedback()
                showFeedback = false;
                discardable = true;
                // Next question
                doNextQuestion();
                return;
            }
            $scope.btDiscardQuestion = function() {
                // Set state and status variables
                answerChecked = false;
                usedHint = false;
                showFeedback = false;
                
                // This if-statement is for the case when the question was already
                // discarded because the user answered it correctly.
                if (discardable) {
                    // Update the mapping for number of times dicarded
                    discardMap[questionQueue[currentQuestionIndex]] += 1;
                    myService.numTossed += 1;
                    // Remove the current question
                    questionQueue.splice(currentQuestionIndex, 1);
                    // Pretend that we were on the previous question, because
                    // doNextQuestion() will increment.
                    currentQuestionIndex -= 1;
                    // Cycle to next question
                } else {
                    // Change nothing since the question was already tossed,
                    // but increment the number that tracks discarded questions. 
                    myService.numTossed += 1;
                }

                // Reset state and status variables
                answerChecked = false;
                usedHint = false;
                showFeedback = false;
                discardable = true;

                doNextQuestion();
                return;
            }
            $scope.btSkipQuestion = function() {
                if (questionQueue.length == 0) {
                    return;
                }
                // Set state and status variables
                answerChecked = false;
                usedHint = false;
                showFeedback = false;
                // Cycle to next question without doing anything else
                doNextQuestion();
                return;
            }
            $scope.btFinishQuiz = function() {
                window.location.href = "#finishedQuiz"
            }


            /* 
             * Quiz logic functions

            // This function will later implement logic to ask the same question
            // again at a time that is best for student learning


            var reQueue = function(){
                if (questionQueue.length !== 0){
                    // put the question at the back of the queue 
                    if (questionQueue.length < 8) {
                        // dont actually requeue...
                        // head will be moved forward by doNextQuestion()
                    } else {
                        if (wrongStreak > wrongStreakLimit){
                            wrongStreak = 0;
                            // dont actually requeue...
                            // head will be moved forward by doNextQuestion()
                        } else {
                            questionQueue.splice((currentQuestionIndex + 7) % questionQueue.length,0,questionQueue.splice(currentQuestionIndex,1)[0]);
                        }
                    }
                }
            }*/
            // helper function to update data according to accuracy of solution
            var calcFeedback = function(submittedAnswer){
                $scope.submittedAnswer = submittedAnswer;
                if (answerCorrect) {
                    wrongStreak = 0;
                    if (hintAvailable){ // correct on first try
                        if (questionQueue.length !== 0) { 
                            // update the mapping for number of times correct
                            correctQuestionID.push((parseInt(currentQuestionIndex)+1));
                            correctMap[questionQueue[currentQuestionIndex]] += 1;
                            // probabalistically
                            // Remove the current question
                            // to enhance learning
                            
                            var P = Math.random();
                            // threshold is a global declared in init
                            if ( P <= threshold ) {
                                discardable = false;
                                // remove it
                                //questionQueue.splice(currentQuestionIndex, 1);
                                // decrement the currentQuestionIndex to pretend that
                                // we were on the last question, so doNextQuestion()
                                // can increment it.
                                //currentQuestionIndex -= 1;
                            } //else {
                                //discardable = true;
                                // requeue it
                                //reQueue();
                            //}
                        }
                    } //else { // got it correct on second try
                        //reQueue();
                    //}
                    hintAvailable = true;
                } else { // incorrect solution
                    hintAvailable = false;
                    incorrectMap[questionQueue[currentQuestionIndex]] += 1;
                    if (usedHint){
                        if (questionQueue.length !== 0){
                            wrongStreak += 1;
                            // update the mapping for number of times incorrect
                           // reQueue();
                        }
                    } 
                }

                // Send pageview
                ga('set', 'page', '/quiz-feedback');
                ga('send', 'pageview');
                console.log("Google Analytics pageview sent: /quiz-feedback");

                return;
            }
            // used to shuffle the questionQueue
            /*  var shuffle = function(arr) {
                  var curi = arr.length;
                  while (0 !== curi) {
                      var randi = Math.floor(Math.random() * curi);
                      curi -= 1;
                      var tmp = arr[curi];
                      arr[curi] = arr[randi];
                      arr[randi] = tmp;
                  }
                  return;
              }



               * Functions for generating questions and answers from question bank
               */
            /* 
             * findBlank
             * unformQ
                an instance of e
             * ans
                array of answers
             * index
                index does neccessary equal n
                this represents the index of the instance of n
             * returns [preBlank,postBlank,solution,answer]
             * e.g.
                sentence related to inputs : "this sentence has three key terms."
                input:
                    unformQ : "this [[2]] has [[0]] key [[1]]."
                    ans : [ "three" , "terms" , "sentence" ]
                    index : 1
                output:
                    preBlank : "this sentence has "
                    postBlank : "key terms."
                    solution : "this sentence has three key terms."
                    answer : ans[my_key] i.e. "three"
                        my_key : 0 derived from number found at index
             */
            var findBlank = function( unformQ, ans, index ){
                // used to build the sentence...
                //      sets preblank
                //      sets postblank
                var s = "";
                var preBlank = "";
                var postBlank = "";
                // split on '[' expecting [s,'','n]]'s, ... ]
                //      Potentially : [s,s, ...] in the event of a single '['
                var arr_unformQ_l_split = unformQ.split('[');
                // ideally represents the number of key terms available
                var l = arr_unformQ_l_split.length;
                var cur_index = -1;
                var my_key = -1;
                // used to discover potential key term indexes
                var spot_3 = 0;

                for(var j = 0; j < l; j++){
                    spot_3 += 1;
                    var point_of_interest = arr_unformQ_l_split[j];
                    if ( spot_3 === 1 ) {
                        s += point_of_interest;
                        continue;
                    }
                    if ( spot_3 === 2 ) {
                        // If the parent sentence had '[[' in it
                        //      Ideal
                        if ( point_of_interest === "" ) {
                            continue;
                        }
                        // found a stray '[' and need to add it into the output question
                        spot_3 = 1;
                        s += "[";
                        s += point_of_interest;
                        continue;
                    } 
                    // have found '[[' in the sentence
                    if ( spot_3 === 3 ) {
                        // the point_of_interest is hopefully of the form
                        //      n]] s
                        // should become
                        //      [ 'n', '', some stuff, only more stuff if there is a stray ']']
                        var arr_unformQ_r_split = point_of_interest.split(']');
                        // ideally has length 3
                        var l_2 = arr_unformQ_r_split.length;
                        // get the first item and convert it to a number
                        //      Will be NaN if the item was not in fact a number
                        var num = Number(arr_unformQ_r_split[0]);
                        // see if it's ideal
                        if ( !isNaN(num) && arr_unformQ_r_split[1] === ""){
                            cur_index += 1;
                            if ( cur_index === index ) {
                                // set the preBlank
                                preBlank = s;
                                // reset s to later be written to "postBlank"
                                s = "";
                                // set the key to be the number found at our desired index
                                my_key = num;
                                // reset spot_3
                                spot_3 = 1;
                            } else {
                                // 
                                s += ans[num];
                            }
                            s += arr_unformQ_r_split[2];
                            // super unlikely but there could* be stray ']'
                            //      this should take care of adding them back in with the other strings
                            for( var k = 3; k < l_2 ; k += 1 ) {
                                s += "]";
                                s += arr_unformQ_r_split[k];
                            }
                            // add in the other information
                            spot_3 = 1;
                            continue;
                        }
                        // found stray ']'
                        s += arr_unformQ_r_split[0];
                        s += "]";
                        for( var k = 2; k < l_2 ; k += 1 ) {
                            s = "]"
                            s += arr_unformQ_r_split[k];
                        }
                        spot_3 = 1;
                        continue;
                    }
                    // I believe this fails on '[[[' or any additional '[' beyond 2
                    // also might fail on ']]]'
                    console.log("something has gone terribly wrong in findBlank.");
                    continue;
                }

                var postBlank = s;
                var answer = ans[my_key];
                var solution = preBlank + answer + postBlank;

                return [preBlank,postBlank,solution,answer];

            }

            var findBlank = function( unformQ, ans, index ){
                var s = "";
                var preBlank = "";
                var postBlank = "";
                var arr_unformQ_l_split = unformQ.split('[');
                var l = arr_unformQ_l_split.length;
                var cur_index = -1;
                var my_key = -1;
                var spot_3 = 0;
                for(var j = 0; j < l; j++){
                    spot_3 += 1;
                    var point_of_interest = arr_unformQ_l_split[j];
                    if ( spot_3 === 1 ) {
                        s += point_of_interest;
                        continue;
                    } if ( spot_3 === 2 ) {
                        if ( point_of_interest === "" ) {
                            continue;
                        }
                        // found a stray '['
                        spot_3 = 1;
                        s += "[";
                        s += point_of_interest;
                        continue;
                    } if ( spot_3 === 3 ) {
                        var arr_unformQ_r_split = point_of_interest.split(']');
                        var l_2 = arr_unformQ_r_split.length;
                        var num = Number(arr_unformQ_r_split[0]);
                        if ( !isNaN(num) && arr_unformQ_r_split[1] === ""){
                            cur_index += 1;
                            if ( cur_index === index ) {
                                preBlank = s;
                                s = "";
                                my_key = num;
                                spot_3 = 1;
                            } else {
                                s += ans[num];
                            }
                            s += arr_unformQ_r_split[2];
                            for( var k = 3; k < l_2 ; k += 1 ) {
                                s += "]";
                                s += arr_unformQ_r_split[k];
                            }
                            spot_3 = 1;
                            continue;
                        }
                        // found stray ']'
                        s += arr_unformQ_r_split[0];
                        s += "]";
                        for( var k = 2; k < l_2 ; k += 1 ) {
                            s == "]"
                            s += arr_unformQ_r_split[k];
                        }
                        spot_3 = 1;
                        continue;
                    }
                    console.log("something has gone terribly wrong in findBlank.");
                    continue;
                }
                var postBlank = s;
                var answer = ans[my_key];
                var solution = preBlank + answer + postBlank;
                return [preBlank,postBlank,solution,answer];
            }
            /*
             * getKeyUse
             * input:
                sentence e of the form e ::= s[[n]]e | s
             * output:
                countKeyUse : the number of keys in the sentence
             * e.g.
                sentence : "this [[2]] has [[0]] key [[1]]."
                countKeyUse : 3
             */
            var getKeyUse = function( sentence ) {
                var countKeyUse = 0;
                // split on '[' expecting [s,'','n]]'s, ... ]
                //      Potentially : [s,s, ...] in the event of a single '['
                var arr_unformQ_l_split = sentence.split('[');
                var l = arr_unformQ_l_split.length;
                var spot_3 = 0;
                for(var j = 0; j < l; j++){
                    spot_3 += 1;
                    var point_of_interest = arr_unformQ_l_split[j];
                    if ( spot_3 === 1 ) {
                        continue;
                    } if ( spot_3 === 2 ) {
                        // If the parent sentence had '[[' in it
                        //      Ideal
                        if ( point_of_interest === "" ) {
                            continue;
                        }
                        // found a stray '['
                        spot_3 = 1;
                        continue;
                    } 
                    // have found '[[' in the sentence
                    if ( spot_3 === 3 ) {
                        // the point_of_interest is hopefully of the form
                        //      n]] s
                        // should become
                        //      [ 'n', '', some stuff, only more stuff if there is a stray ']']
                        var arr_unformQ_r_split = point_of_interest.split(']');
                        // ideally length 3
                        var l_2 = arr_unformQ_r_split.length;
                        // get the first item and convert it to a number
                        //      Will be NaN if the item was not in fact a number
                        var num = Number(arr_unformQ_r_split[0]);
                        // see if it's ideal
                        if ( !isNaN(num) && arr_unformQ_r_split[1] === ""){
                            // we found a KeyUse
                            countKeyUse += 1;
                            // reset spot_3
                            spot_3 = 1;
                            continue;
                        }
                        //reset_spot3
                        spot_3 = 1;
                        continue;
                    }
                    console.log("something has gone terribly wrong in getKeyUse.");
                    return 0;
                }
                return countKeyUse;
            }
            // question initializer
            var Question = function(qBank, qi, ai) {
                /*
                 * qi - question index
                 * question - question string with [[0]]
                 * answer - answer string
                 * preBlank - string part of question before ____
                 * postBlank - string part of question after ____
                 * fullSolution - solution string
                 */
                this.qi = qi;

                this.sentence = qBank.fillInTheBlank[qi].sentence;
                var ans = qBank.fillInTheBlank[qi].keys;

                var unformQ = this.sentence;
                var tmp = findBlank( unformQ, ans, ai );
                this.preBlank = tmp[0];
                this.postBlank = tmp[1];
                this.fullSolution = tmp[2];
                this.key = tmp[3];
            }
            var Phase2Question = function(a,index){
                this.sentence = a.fillInTheBlank[index].sentence;

                this.preBlank = tmp[0];
                this.postBlank = tmp[1];
                //this.fullSolution = tmp[2];
                this.key = tmp[3];
            }
            var Phase2Restudy = function(a2, index2,b2){


            }



            init();

        }]
    );
})();
