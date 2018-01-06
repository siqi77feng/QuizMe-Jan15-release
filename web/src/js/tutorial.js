(function(){
    angular.module('quizMeApp')
        .controller('TutorialCtrl',
            ['$scope','$location','myService',
                function TutorialCtrl( $scope, $location, myService ) {
                    'use strict';
                    $scope.meta = {
                        title: "tutorial Page"
                    };
                    var page = 0;
                    $(".aaa").hide();
                    $("#a").show();
                    $(".tutorial-button").click(function () {
                        $(".aaa").hide();
                        $("#pageOne").show();
                        $(".name-button").click(function () {
                            $(".aaa").hide();
                            $("#pageTwo").show();
                            $(".submitSurvey").click(function () {
                                $(".aaa").hide();
                                $("#pageThree").show();
                                $(".GoPageFour").click(function () {
                                    $(".aaa").hide();
                                    $("#pageTour").show();
                                });
                            });
                        });
                    });

                    var haveID;
                    var identiKey;
                    var firstName;
                    var lastName;
                    var studentID;
                    var university;
                    var professor;
                    var subject;
                    myService.n = Math.floor(Math.random()*2);
                    var n =myService.n

                    console.log(myService.n)
                    // init called at end of file
                    var tutorial_init = function() {
                        document.getElementById("identikey-box").value = "";
                        document.getElementById("identikey-box").readOnly = false;
                        document.getElementById("identikey-box").focus();

                        haveID = false;
                        myService.questionsGenerated = false;
                        myService.questions = "";
                        identiKey="";
                        ga('set', 'page', '/tutorial');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /tutorial");
                    };
                    var tutorial_init2 = function() {
                        document.getElementById("firstName-box").value = "";
                        document.getElementById("firstName-box").readOnly = false;
                        document.getElementById("firstName-box").focus();
                        document.getElementById("lastName-box").value = "";
                        document.getElementById("lastName-box").readOnly = false;
                        document.getElementById("lastName-box").focus();
                        haveID = false;
                        myService.questionsGenerated = false;
                        myService.questions = "";
                        firstName="";
                        lastName="";
                        ga('set', 'page', '/tutorial');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /tutorial");
                    };


                    // helper functions
                    var isValidID = function(){
                        identiKey = myService.identiKey;
                        if (identiKey == "") {
                            return false;
                        }
                        var ret = sendUserData();
                        return ret;
                    };

                    // Sends data for one user to the backend
                    var sendUserData = function() {

                        // Create JSON object to send
                        var userData = {
                            "identiKey": identiKey,
                        };

                        var ret = $.ajax({
                            async: true,
                            url: './updateUserInfo',
                            type: 'POST',
                            data: userData,
                            success: function(data) {
                                console.log("FRONTEND userData: returned "+data);
                                identikeyValidationCallback(true);
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown){
                                //replace the console.log with redirect to error page
                                console.error(errorThrown + ": " + XMLHttpRequest.responseText);
                                identikeyValidationCallback(false);
                            }
                        });


                        console.log(ret);
                        console.log("Returning from sendUserData");
                        return ret.status===200;
                    };
                    var sendUserData2 = function() {

                        // Create JSON object to send
                        var userData2 = {
                            "identikey": identiKey,
                            "firstName": myService.firstName,
                            "lastName": myService.lastName,
                            "studentID": myService.studentID,
                            "university": myService.university,
                            "professor": myService.professor,
                            "subject": myService.subject,
                            "n": myService.n

                        };

                        var ret2 = $.ajax({
                            async: true,
                            url: './tutorialUser',
                            type: 'POST',
                            data: userData2

                        });

                        console.log(ret2);
                        console.log("Returning from sendUserData");
                        return ret2.status===200;
                    };

                    var clearIdentikey = function(){
                        document.getElementById("identikey-box").value = "";
                    };

                    var clearFirstName = function(){
                        document.getElementById("firstName-box").value = "";
                    };
                    var clearLastName = function(){
                        document.getElementById("lastName-box").value = "";
                    };

                    var clearStudentID = function(){
                        document.getElementById("studentID-box").value = "";
                    };

                    var clearUniversity = function(){
                        document.getElementById("university-box").value = "";
                    };

                    var clearProfessor = function(){
                        document.getElementById("professor-box").value = "";
                    };

                    // Driver called on QuizMe click
                    $scope.QuizMe = function() {
                        myService.identiKey = document.getElementById("identikey-box").value;
                        var re = /\S+@\S+\.\S+/;
                        if (re.test(myService.identiKey)) {
                            isValidID();
                        }
                        else {
                            alert('Please use a valid Return Email.');
                            clearIdentikey();
                        }
                        return;
                        return;
                        // Returns for now, but isValidID() asynchronously
                        // calls the backend, and it calls back to
                        // identikeyValidationCallback() immediately below this.
                    }
                    $scope.QuizMe2 = function() {
                        myService.firstName = document.getElementById("firstName-box").value;
                        myService.lastName = document.getElementById("lastName-box").value;
                        myService.studentID = document.getElementById("studentID-box").value;
                        myService.university = document.getElementById("university-box").value;
                        myService.professor = document.getElementById("professor-box").value;
                        return;
                        // Returns for now, but isValidID() asynchronously
                        // calls the backend, and it calls back to
                        // identikeyValidationCallback() immediately below this.
                    }
                    $scope.QuizMe3 = function(subject) {
                        myService.subject = subject;
                        sendUserData2();

                        console.log(myService.subject);
                        return;
                        // Returns for now, but isValidID() asynchronously
                        // calls the backend, and it calls back to
                        // identikeyValidationCallback() immediately below this.
                    }
                    var identikeyValidationCallback = function(validID) {
                        if (validID) {
                            haveID = true;
                            document.getElementById('identikey-box').disabled = true;
                            $scope.$apply(); // Force Angular to update
                        } else {
                            alert('Please use a valid IdentiKey as username.');
                            clearIdentikey();
                        };
                        return;
                    };


                    $scope.haveID = function() {
                        return haveID;
                    };
                    $scope.PSYC2145Ch1 = function() {
                        // 12 % 2 = 0 11 % 2 = 1
                        // "Sports and GMING" + 1 = "sports and gaming1"
                        console.log(myService.n);
                        if(myService.n ==0) {
                            requestCh("Sport and Gaming A", "Sport and Gaming", identiKey, firstName, lastName);
                        }
                        else{
                            requestCh("Sport and Gaming B", "Sport and Gaming", identiKey, firstName, lastName);
                        }
                        return;
                    };
                    $scope.PSYC2145Ch2 = function() {
                        if(myService.n==0) {
                            requestCh("Animal and Biology A", "Animal and Biology", identiKey, firstName, lastName);
                        }
                        else{
                            requestCh("Animal and Biology B","Animal and Biology",identiKey,firstName, lastName);
                        }

                        return;
                    };
                    $scope.PSYC2145Ch3 = function() {
                        if(myService.n==0) {
                            requestCh("Food and Drink A", "Food and Drink", identiKey, firstName, lastName);
                        }
                        else{
                            requestCh("Food and Drink B", "Food and Drink", identiKey, firstName, lastName);
                        }
                        return;
                    };
                    $scope.PSYC2145Ch4 = function() {
                        if(myService.n==0) {
                            requestCh("World History A", "World History", identiKey, firstName, lastName);
                        }
                        else{
                            requestCh("World History B", "World History", identiKey, firstName, lastName);
                        }
                        return;
                    };
                    $scope.PSYC2145Ch5 = function() {
                        if(myService.n==0) {
                            requestCh("Anatomy and Medicine A", "Anatomy and Medicine", identiKey, firstName, lastName);
                        }
                        else{
                            requestCh("Anatomy and Medicine B", "Anatomy and Medicine", identiKey, firstName, lastName);
                        }
                        return;
                    };


                    var goodLearner, goodGrades, studyingEfficiently, consent_val, additionalSurvey1, additionalSurvey2, additionalSurvey3, additionalSurvey4, additionalSurvey5, additionalSurvey6;
                    var surveyTaken;


                    var finishedQuiz_init = function() {
                        // Pull quiz results data from service
                        if(myService.n ==0) {
                            $scope.number_correct = myService.numCorrectINA;
                            $scope.number_correct4Return = myService.numCorrectReturn;
                        }
                        else{
                            $scope.number_correct = myService.numCorrectINB;
                            $scope.number_correct4Return = myService.numCorrectReturn;

                        }
                        $scope.number_incorrect = myService.numIncorrect;
                        $scope.number_tossed = myService.numTossed;
                        //$scope.number_correct = sum_arr(quiz_finishedQuiz.correctMap);
                        //$scope.number_incorrect = sum_arr(quiz_finishedQuiz.incorrectMap);
                        //$scope.number_tossed = sum_arr(quiz_finishedQuiz.tossedMap);

                        // Initialize form feedback values

                        surveyTaken = false;

                        // Send pageview
                        ga('set', 'page', '/tutorial');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /tutorial");

                        return;
                    }



                    $scope.isTaken = function() {
                        return surveyTaken;
                    }

                    var sum_arr = function(arr) {
                        var sum;
                        sum = 0;
                        for (var arr_i in arr) {
                            sum += Number(arr_i)
                        }
                        return sum;
                    }

                    $scope.consume_tutorialFeedback = function() {

                        var docID = myService.docID;
                        var firstName = myService.firstName;
                        var lastName = myService.lastName;
                        var studentID = myService.studentID;
                        var university = myService.university;
                        var professor = myService.professor;



                        var tutorialFeedback = {
                            // "docID":	docID,
                            "firstName": firstName,
                            "lastName": lastName,
                            "studentID": studentID,
                            "university": university,
                            "professor" : professor,
                            "identiKey": identiKey,
                            "additionalSurvey1": additionalSurvey1,
                            "additionalSurvey2": additionalSurvey2,
                            "additionalSurvey3": additionalSurvey3,
                            "additionalSurvey4": additionalSurvey4,
                            "additionalSurvey5": additionalSurvey5,
                            "additionalSurvey6": additionalSurvey6,
                            "consent_val": consent_val,
                            "goodLearner":	goodLearner,
                            "goodGrades":	goodGrades,
                            "studyingEfficiently":studyingEfficiently,
                            "n": n

                        };

                        console.log(tutorialFeedback);


                        // send ...
                        $.ajax({
                            type: "POST",
                            url: './tutorialSurvey',
                            //contentType: "application/json",
                            data: tutorialFeedback,
                            dataType: false,
                            // data received from backend doesn't really need to be presented to the user....
                            success: function(data){
                                console.log('feedback successful!\n' + data);
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown){
                                //replace the console.log with redirect to error page
                                console.error(errorThrown + ": " + XMLHttpRequest.responseText);
                            }
                        });
                        clearVal();

                        surveyTaken = true;

                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                        // Send pageview
                        ga('set', 'page', '/survey-submit');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /survey-submit");

                        return;
                    }

                    var clearVal = function() {
                        clearBtn("additionalSurvey1");
                        clearBtn("additionalSurvey2");
                        clearBtn("additionalSurvey3");
                        clearBtn("additionalSurvey4");
                        clearBtn("additionalSurvey5");
                        clearBtn("additionalSurvey6");
                        clearBtn("helpful");
                        clearBtn("appropriate");
                        clearBtn("easy");
                        additionalSurvey1 = 0;
                        additionalSurvey2 = 0;
                        additionalSurvey3 = 0;
                        additionalSurvey4 = 0;
                        additionalSurvey5 = 0;
                        additionalSurvey6 = 0;
                        studyingEfficiently = 0;
                        goodGrades = 0;
                        goodLearner = 0;
                        consent_val= 0;
                        return;
                    }
                    var clearCon = function(s){
                        if (s === "consent"){
                            for (var i = 1; i < 3; i++){
                                var elId = s+'_'+i
                                var el = document.getElementById(elId);
                                el.className = "";
                            }
                            return;
                        }
                        console.log("something has got terrbily wrong in clearBtn of tutorial.js");
                        return;

                    }//consent clear

                    // the buttons
                    var clearBtn = function(s) {
                        if (s === "additionalSurvey1" |s === "additionalSurvey2" |s === "additionalSurvey3" |s === "additionalSurvey4" |s === "additionalSurvey5" |s === "additionalSurvey6" |
                            s === "helpful" | s === "appropriate" | s === "easy" ){
                            for (var i = 1; i < 8; i++) {
                                var elId = s+'_'+i
                                var el = document.getElementById(elId);
                                el.className = "";
                            }
                            return;
                        }
                        console.log("something has got terrbily wrong in clearBtn of tutorial.js");
                        return;
                    }
                    var setVal = function(s,n) {
                        if (s === "additionalSurvey1") {
                            additionalSurvey1 = n;
                            return;
                        }
                        if ( s === "additionalSurvey2" ) {
                            additionalSurvey2 = n;
                            return;
                        }
                        if ( s === "additionalSurvey3" ) {
                            additionalSurvey3 = n;
                            return;
                        }
                        if (s === "additionalSurvey4") {
                            additionalSurvey4 = n;
                            return;
                        }
                        if ( s === "additionalSurvey5" ) {
                            additionalSurvey5 = n;
                            return;
                        }
                        if ( s === "additionalSurvey6" ) {
                            additionalSurvey6 = n;
                            return;
                        }

                        if (s === "helpful") {
                            goodLearner = n;
                            return;
                        }
                        if ( s === "appropriate" ) {
                            goodGrades = n;
                            return;
                        }
                        if ( s === "easy" ) {
                            studyingEfficiently = n;
                            return;
                        }
                        return;
                    }
                    var setVal1 = function(s,n) {
                        if (s === "consent") {
                            consent_val = n;
                            return;
                        }
                        return;
                    }
                    var setBtn = function(s,n) {
                        var elId = s+"_"+n;
                        var el = document.getElementById(elId);
                        el.className = "clicked";
                        return;
                    }
                    var setBtn1 = function(s,n) {
                        var elId = s+"_"+n;
                        var el = document.getElementById(elId);
                        el.className = "clicked";
                        return;
                    }
                    /*var setFocus = function(s) {
                        if (s === "helpful" | s === "appropriate" | s === "easy" ){
                            var elId = s;
                            var el = document.getElementById(elId);
                            el.focus();
                            return;
                        }
                        console.log("something has got terrbily wrong in setFocus of tutorial.js");
                        return;
                    }*/
                    var valCtrl = function(s,n) {
                        clearBtn(s);
                        setBtn(s, n);
                        setVal(s,n);
                        //setFocus(s);
                        return;
                    }
                    // helpful
                    var helpfulCtrl = function(n) {
                        var s = "helpful";
                        valCtrl(s,n);
                        return;
                    }
                    var valCtrl1 = function(s,n) {
                        clearCon(s);
                        setBtn1(s, n);
                        setVal1(s,n);
                        //setFocus(s);
                        return;
                    }


                    var consentCtrl = function(n) {
                        var s = "consent";
                        valCtrl1(s,n);
                        return;
                    }
                    $scope.helpful1 = function (){
                        helpfulCtrl(1);
                        return;
                    };$scope.helpful2 = function (){
                        helpfulCtrl(2);
                        return;
                    };$scope.helpful3 = function (){
                        helpfulCtrl(3);
                        return;
                    };$scope.helpful4 = function (){
                        helpfulCtrl(4);
                        return;
                    };$scope.helpful5 = function (){
                        helpfulCtrl(5);
                        return;
                    };$scope.helpful6 = function (){
                        helpfulCtrl(6);
                        return;
                    };$scope.helpful7 = function (){
                        helpfulCtrl(7);
                        return;
                    };
                    $scope.helpful8 = function (){
                        consentCtrl(1);
                        return;
                    };

                    $scope.helpful9 = function (){
                        consentCtrl(2);
                        return;
                    };




                    var easyCtrl1 = function(n) {
                        var s = "additionalSurvey1";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.additionalSurvey1_1 = function (){
                        easyCtrl1(1);
                        return;
                    }; $scope.additionalSurvey1_2 = function (){
                        easyCtrl1(2);
                        return;
                    }; $scope.additionalSurvey1_3 = function (){
                        easyCtrl1(3);
                        return;
                    }; $scope.additionalSurvey1_4 = function (){
                        easyCtrl1(4);
                        return;
                    }; $scope.additionalSurvey1_5 = function (){
                        easyCtrl1(5);
                        return;
                    }; $scope.additionalSurvey1_6 = function (){
                        easyCtrl1(6);
                        return;
                    }; $scope.additionalSurvey1_7 = function (){
                        easyCtrl1(7);
                        return;
                    };

                    var easyCtrl2 = function(n) {
                        var s = "additionalSurvey2";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.additionalSurvey2_1 = function (){
                        easyCtrl2(1);
                        return;
                    }; $scope.additionalSurvey2_2 = function (){
                        easyCtrl2(2);
                        return;
                    }; $scope.additionalSurvey2_3 = function (){
                        easyCtrl2(3);
                        return;
                    }; $scope.additionalSurvey2_4 = function (){
                        easyCtrl2(4);
                        return;
                    }; $scope.additionalSurvey2_5 = function (){
                        easyCtrl2(5);
                        return;
                    }; $scope.additionalSurvey2_6 = function (){
                        easyCtrl2(6);
                        return;
                    }; $scope.additionalSurvey2_7 = function (){
                        easyCtrl2(7);
                        return;
                    };

                    var easyCtrl3 = function(n) {
                        var s = "additionalSurvey3";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.additionalSurvey3_1 = function (){
                        easyCtrl3(1);
                        return;
                    }; $scope.additionalSurvey3_2 = function (){
                        easyCtrl3(2);
                        return;
                    }; $scope.additionalSurvey3_3 = function (){
                        easyCtrl3(3);
                        return;
                    }; $scope.additionalSurvey3_4 = function (){
                        easyCtrl3(4);
                        return;
                    }; $scope.additionalSurvey3_5 = function (){
                        easyCtrl3(5);
                        return;
                    }; $scope.additionalSurvey3_6 = function (){
                        easyCtrl3(6);
                        return;
                    }; $scope.additionalSurvey3_7 = function (){
                        easyCtrl3(7);
                        return;
                    };

                    var easyCtrl4 = function(n) {
                        var s = "additionalSurvey4";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.additionalSurvey4_1 = function (){
                        easyCtrl4(1);
                        return;
                    }; $scope.additionalSurvey4_2 = function (){
                        easyCtrl4(2);
                        return;
                    }; $scope.additionalSurvey4_3 = function (){
                        easyCtrl4(3);
                        return;
                    }; $scope.additionalSurvey4_4 = function (){
                        easyCtrl4(4);
                        return;
                    }; $scope.additionalSurvey4_5 = function (){
                        easyCtrl4(5);
                        return;
                    }; $scope.additionalSurvey4_6 = function (){
                        easyCtrl4(6);
                        return;
                    }; $scope.additionalSurvey4_7 = function (){
                        easyCtrl4(7);
                        return;
                    };

                    var easyCtrl5 = function(n) {
                        var s = "additionalSurvey5";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.additionalSurvey5_1 = function (){
                        easyCtrl5(1);
                        return;
                    }; $scope.additionalSurvey5_2 = function (){
                        easyCtrl5(2);
                        return;
                    }; $scope.additionalSurvey5_3 = function (){
                        easyCtrl5(3);
                        return;
                    }; $scope.additionalSurvey5_4 = function (){
                        easyCtrl5(4);
                        return;
                    }; $scope.additionalSurvey5_5 = function (){
                        easyCtrl5(5);
                        return;
                    }; $scope.additionalSurvey5_6 = function (){
                        easyCtrl5(6);
                        return;
                    }; $scope.additionalSurvey5_7 = function (){
                        easyCtrl5(7);
                        return;
                    };

                    var easyCtrl6 = function(n) {
                        var s = "additionalSurvey6";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.additionalSurvey6_1 = function (){
                        easyCtrl6(1);
                        return;
                    }; $scope.additionalSurvey6_2 = function (){
                        easyCtrl6(2);
                        return;
                    }; $scope.additionalSurvey6_3 = function (){
                        easyCtrl6(3);
                        return;
                    }; $scope.additionalSurvey6_4 = function (){
                        easyCtrl6(4);
                        return;
                    }; $scope.additionalSurvey6_5 = function (){
                        easyCtrl6(5);
                        return;
                    }; $scope.additionalSurvey6_6 = function (){
                        easyCtrl6(6);
                        return;
                    }; $scope.additionalSurvey6_7 = function (){
                        easyCtrl6(7);
                        return;
                    };

                    // appropriate
                    var appropriateCtrl = function(n) {
                        var s = "appropriate";
                        valCtrl(s,n);
                        return;
                    }
                    $scope.appropriate1 = function (){
                        appropriateCtrl(1);
                        return;
                    }; $scope.appropriate2 = function (){
                        appropriateCtrl(2);
                        return;
                    }; $scope.appropriate3 = function (){
                        appropriateCtrl(3);
                        return;
                    }; $scope.appropriate4 = function (){
                        appropriateCtrl(4);
                        return;
                    }; $scope.appropriate5 = function (){
                        appropriateCtrl(5);
                        return;
                    }; $scope.appropriate6 = function (){
                        appropriateCtrl(6);
                        return;
                    }; $scope.appropriate7 = function (){
                        appropriateCtrl(7);
                        return;
                    };
                    // easy
                    var easyCtrl = function(n) {
                        var s = "easy";
                        valCtrl(s,n);
                        return;
                    };
                    $scope.easy1 = function (){
                        easyCtrl(1);
                        return;
                    }; $scope.easy2 = function (){
                        easyCtrl(2);
                        return;
                    }; $scope.easy3 = function (){
                        easyCtrl(3);
                        return;
                    }; $scope.easy4 = function (){
                        easyCtrl(4);
                        return;
                    }; $scope.easy5 = function (){
                        easyCtrl(5);
                        return;
                    }; $scope.easy6 = function (){
                        easyCtrl(6);
                        return;
                    }; $scope.easy7 = function (){
                        easyCtrl(7);
                        return;
                    };
                    finishedQuiz_init();


                    $(".sportNextPage").click(function () {
                        page = page + 1;
                        switch(page){
                            case 1:
                                $(".aaa").hide();
                                $("#tutorialPage").show();
                                break;
                            case 2:
                                $(".aaa").hide();
                                $("#sportPage2").show();
                                break;
                            case 3:
                                $(".aaa").hide();
                                $("#sportPage3").show();
                                break;
                            case 4:
                                $(".aaa").hide();
                                $("#sportPage4").show();
                                break;
                            case 5:
                                $(".aaa").hide();
                                $("#sportPage5").show();
                                break;
                            case 6:
                                $(".aaa").hide();
                                $("#sportPage6").show();
                                break;
                            case 7:
                                $(".aaa").hide();
                                $("#sportPage7").show();
                                break;
                            case 8:
                                $(".aaa").hide();
                                $("#sportPage8").show();
                                break;
                            case 9:
                                $(".aaa").hide();
                                $("#sportPage9").show();
                                break;
                            case 10:
                                $(".aaa").hide();
                                $("#sportPage10").show();
                                break;
                            case 11:
                                $(".aaa").hide();
                                $("#sportPage11").show();
                                break;
                            case 12:
                                $(".aaa").hide();
                                $("#sportPage12").show();
                                break;
                            case 13:
                                $(".aaa").hide();
                                $("#sportPage13").show();
                                break;
                            case 14:
                                $(".aaa").hide();
                                $("#sportPage14").show();
                                break;
                            case 15:
                                $(".aaa").hide();
                                $("#sportPage15").show();
                                break;
                            case 16:
                                $(".aaa").hide();
                                $("#sportPage16").show();
                                break;
                            case 17:
                                $(".aaa").hide();
                                $("#sportPage17").show();
                                break;
                            case 18:
                                $(".aaa").hide();
                                $("#sportPage18").show();
                                break;
                            case 19:
                                $(".aaa").hide();
                                $("#sportPage19").show();
                                break;
                            case 20:
                                $(".aaa").hide();
                                $("#sportPage20").show();
                                break;
                            case 21:
                                $(".aaa").hide();
                                $("#sportPage21").show();
                                break;
                            case 22:
                                $(".aaa").hide();
                                $("#z").show();
                                break;
                            case 23:
                                if(myService.n == 0)
                                {
                                    $(".aaa").hide();
                                    $("#restudy").show();
                                    $(".sportNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#restudy2").show();
                                        $(".sportNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#restudy3").show();
                                            $(".sportNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#restudy4").show();
                                                $(".sportNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#restudy5").show();
                                                    $(".sportNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#restudy6").show();
                                                        $(".sportNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#restudy7").show();
                                                            $(".sportNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#restudy8").show();
                                                                $(".sportNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#restudy9").show();
                                                                    $(".sportNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#restudy10").show();
                                                                        $(".sportNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#sportQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });

                                }
                                else{
                                    $(".aaa").hide();
                                    $("#restudyB").show();
                                    $(".sportNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#restudy2B").show();
                                        $(".sportNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#restudy3B").show();
                                            $(".sportNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#restudy4B").show();
                                                $(".sportNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#restudy5B").show();
                                                    $(".sportNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#restudy6B").show();
                                                        $(".sportNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#restudy7B").show();
                                                            $(".sportNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#restudy8B").show();
                                                                $(".sportNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#restudy9B").show();
                                                                    $(".sportNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#restudy10B").show();
                                                                        $(".sportNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#sportQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });
                                }
                                break;
                        }
                    });
                    $(".movieNextPage").click(function () {
                        page = page + 1;
                        switch(page){
                            case 1:
                                $(".aaa").hide();
                                $("#tutorialPage2").show();
                                break;
                            case 2:
                                $(".aaa").hide();
                                $("#moviePage2").show();
                                break;
                            case 3:
                                $(".aaa").hide();
                                $("#moviePage3").show();
                                break;
                            case 4:
                                $(".aaa").hide();
                                $("#moviePage4").show();
                                break;
                            case 5:
                                $(".aaa").hide();
                                $("#moviePage5").show();
                                break;
                            case 6:
                                $(".aaa").hide();
                                $("#moviePage6").show();
                                break;
                            case 7:
                                $(".aaa").hide();
                                $("#moviePage7").show();
                                break;
                            case 8:
                                $(".aaa").hide();
                                $("#moviePage8").show();
                                break;
                            case 9:
                                $(".aaa").hide();
                                $("#moviePage9").show();
                                break;
                            case 10:
                                $(".aaa").hide();
                                $("#moviePage10").show();
                                break;
                            case 11:
                                $(".aaa").hide();
                                $("#moviePage11").show();
                                break;
                            case 12:
                                $(".aaa").hide();
                                $("#moviePage12").show();
                                break;
                            case 13:
                                $(".aaa").hide();
                                $("#moviePage13").show();
                                break;
                            case 14:
                                $(".aaa").hide();
                                $("#moviePage14").show();
                                break;
                            case 15:
                                $(".aaa").hide();
                                $("#moviePage15").show();
                                break;
                            case 16:
                                $(".aaa").hide();
                                $("#moviePage16").show();
                                break;
                            case 17:
                                $(".aaa").hide();
                                $("#moviePage17").show();
                                break;
                            case 18:
                                $(".aaa").hide();
                                $("#moviePage18").show();
                                break;
                            case 19:
                                $(".aaa").hide();
                                $("#moviePage19").show();
                                break;
                            case 20:
                                $(".aaa").hide();
                                $("#moviePage20").show();
                                break;
                            case 21:
                                $(".aaa").hide();
                                $("#moviePage21").show();
                                break;
                            case 22:
                                $(".aaa").hide();
                                $("#z1").show();
                                break;
                            case 23:
                                if(myService.n== 0)
                                {
                                    $(".aaa").hide();
                                    $("#restudyMovie").show();
                                    $(".movieNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#restudyMovie2").show();
                                        $(".movieNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#restudyMovie3").show();
                                            $(".movieNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#restudyMovie4").show();
                                                $(".movieNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#restudyMovie5").show();
                                                    $(".movieNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#restudyMovie6").show();
                                                        $(".movieNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#restudyMovie7").show();
                                                            $(".movieNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#restudyMovie8").show();
                                                                $(".movieNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#restudyMovie9").show();
                                                                    $(".movieNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#restudyMovie10").show();
                                                                        $(".movieNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#movieQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });

                                }
                                else{
                                    $(".aaa").hide();
                                    $("#restudyMovieB").show();
                                    $(".movieNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#restudyMovieB2").show();
                                        $(".movieNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#restudyMovieB3").show();
                                            $(".movieNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#restudyMovieB4").show();
                                                $(".movieNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#restudyMovieB5").show();
                                                    $(".movieNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#restudyMovieB6").show();
                                                        $(".movieNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#restudyMovieB7").show();
                                                            $(".movieNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#restudyMovieB8").show();
                                                                $(".movieNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#restudyMovieB9").show();
                                                                    $(".movieNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#restudyMovieB10").show();
                                                                        $(".movieNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#movieQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });
                                }
                                break;
                        }
                    });
                    $(".musicNextPage").click(function () {
                        page = page + 1;
                        switch(page){
                            case 1:
                                $(".aaa").hide();
                                $("#tutorialPage3").show();
                                break;
                            case 2:
                                $(".aaa").hide();
                                $("#musicPage2").show();
                                break;
                            case 3:
                                $(".aaa").hide();
                                $("#musicPage3").show();
                                break;
                            case 4:
                                $(".aaa").hide();
                                $("#musicPage4").show();
                                break;
                            case 5:
                                $(".aaa").hide();
                                $("#musicPage5").show();
                                break;
                            case 6:
                                $(".aaa").hide();
                                $("#musicPage6").show();
                                break;
                            case 7:
                                $(".aaa").hide();
                                $("#musicPage7").show();
                                break;
                            case 8:
                                $(".aaa").hide();
                                $("#musicPage8").show();
                                break;
                            case 9:
                                $(".aaa").hide();
                                $("#musicPage9").show();
                                break;
                            case 10:
                                $(".aaa").hide();
                                $("#musicPage10").show();
                                break;
                            case 11:
                                $(".aaa").hide();
                                $("#musicPage11").show();
                                break;
                            case 12:
                                $(".aaa").hide();
                                $("#musicPage12").show();
                                break;
                            case 13:
                                $(".aaa").hide();
                                $("#musicPage13").show();
                                break;
                            case 14:
                                $(".aaa").hide();
                                $("#musicPage14").show();
                                break;
                            case 15:
                                $(".aaa").hide();
                                $("#musicPage15").show();
                                break;
                            case 16:
                                $(".aaa").hide();
                                $("#musicPage16").show();
                                break;
                            case 17:
                                $(".aaa").hide();
                                $("#musicPage17").show();
                                break;
                            case 18:
                                $(".aaa").hide();
                                $("#musicPage18").show();
                                break;
                            case 19:
                                $(".aaa").hide();
                                $("#musicPage19").show();
                                break;
                            case 20:
                                $(".aaa").hide();
                                $("#musicPage20").show();
                                break;
                            case 21:
                                $(".aaa").hide();
                                $("#musicPage21").show();
                                break;
                            case 22:
                                $(".aaa").hide();
                                $("#z2").show();
                                break;
                            case 23:
                                if(myService.n == 0)
                                {
                                    $(".aaa").hide();
                                    $("#restudyMusic").show();
                                    $(".musicNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#restudyMusic2").show();
                                        $(".musicNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#restudyMusic3").show();
                                            $(".musicNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#restudyMusic4").show();
                                                $(".musicNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#restudyMusic5").show();
                                                    $(".musicNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#restudyMusic6").show();
                                                        $(".musicNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#restudyMusic7").show();
                                                            $(".musicNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#restudyMusic8").show();
                                                                $(".musicNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#restudyMusic9").show();
                                                                    $(".musicNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#restudyMusic10").show();
                                                                        $(".musicNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#musicQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });

                                }
                                else{
                                    $(".aaa").hide();
                                    $("#restudyMusicB").show();
                                    $(".musicNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#restudyMusic2B").show();
                                        $(".musicNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#restudyMusic3B").show();
                                            $(".musicNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#restudyMusic4B").show();
                                                $(".musicNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#restudyMusic5B").show();
                                                    $(".musicNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#restudyMusic6B").show();
                                                        $(".musicNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#restudyMusic7B").show();
                                                            $(".musicNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#restudyMusic8B").show();
                                                                $(".musicNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#restudyMusic9B").show();
                                                                    $(".musicNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#restudyMusic10B").show();
                                                                        $(".musicNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#musicQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });
                                }
                                break;
                        }
                    });
                    $(".historyNextPage").click(function () {
                        page = page + 1;
                        switch(page){
                            case 1:
                                $(".aaa").hide();
                                $("#tutorialPage4").show();
                                break;
                            case 2:
                                $(".aaa").hide();
                                $("#historyPage2").show();
                                break;
                            case 3:
                                $(".aaa").hide();
                                $("#historyPage3").show();
                                break;
                            case 4:
                                $(".aaa").hide();
                                $("#historyPage4").show();
                                break;
                            case 5:
                                $(".aaa").hide();
                                $("#historyPage5").show();
                                break;
                            case 6:
                                $(".aaa").hide();
                                $("#historyPage6").show();
                                break;
                            case 7:
                                $(".aaa").hide();
                                $("#historyPage7").show();
                                break;
                            case 8:
                                $(".aaa").hide();
                                $("#historyPage8").show();
                                break;
                            case 9:
                                $(".aaa").hide();
                                $("#historyPage9").show();
                                break;
                            case 10:
                                $(".aaa").hide();
                                $("#historyPage10").show();
                                break;
                            case 11:
                                $(".aaa").hide();
                                $("#historyPage11").show();
                                break;
                            case 12:
                                $(".aaa").hide();
                                $("#historyPage12").show();
                                break;
                            case 13:
                                $(".aaa").hide();
                                $("#historyPage13").show();
                                break;
                            case 14:
                                $(".aaa").hide();
                                $("#historyPage14").show();
                                break;
                            case 15:
                                $(".aaa").hide();
                                $("#historyPage15").show();
                                break;
                            case 16:
                                $(".aaa").hide();
                                $("#historyPage16").show();
                                break;
                            case 17:
                                $(".aaa").hide();
                                $("#historyPage17").show();
                                break;
                            case 18:
                                $(".aaa").hide();
                                $("#historyPage18").show();
                                break;
                            case 19:
                                $(".aaa").hide();
                                $("#historyPage19").show();
                                break;
                            case 20:
                                $(".aaa").hide();
                                $("#historyPage20").show();
                                break;
                            case 21:
                                $(".aaa").hide();
                                $("#historyPage21").show();
                                break;
                            case 22:
                                $(".aaa").hide();
                                $("#z3").show();
                                break;
                            case 23:
                                if(myService.n == 0)
                                {
                                    $(".aaa").hide();
                                    $("#historyRestory").show();
                                    $(".historyNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#historyRestory2").show();
                                        $(".historyNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#historyRestory3").show();
                                            $(".historyNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#historyRestory4").show();
                                                $(".historyNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#historyRestory5").show();
                                                    $(".historyNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#historyRestory6").show();
                                                        $(".historyNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#historyRestory7").show();
                                                            $(".historyNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#historyRestory8").show();
                                                                $(".historyNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#historyRestory9").show();
                                                                    $(".historyNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#historyRestory10").show();
                                                                        $(".historyNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#historyQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });

                                }
                                else{
                                    $(".aaa").hide();
                                    $("#historyRestoryB").show();
                                    $(".historyNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#historyRestory2B").show();
                                        $(".historyNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#historyRestory3B").show();
                                            $(".historyNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#historyRestory4B").show();
                                                $(".historyNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#historyRestory5B").show();
                                                    $(".historyNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#historyRestory6B").show();
                                                        $(".historyNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#historyRestory7B").show();
                                                            $(".historyNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#historyRestory8B").show();
                                                                $(".historyNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#historyRestory9B").show();
                                                                    $(".historyNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#historyRestory10B").show();
                                                                        $(".historyNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#historyQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });
                                }
                                break;
                        }
                    });
                    $(".scienceNextPage").click(function () {
                        page = page + 1;
                        switch(page){
                            case 1:
                                $(".aaa").hide();
                                $("#tutorialPage5").show();
                                break;
                            case 2:
                                $(".aaa").hide();
                                $("#sciencePage2").show();
                                break;
                            case 3:
                                $(".aaa").hide();
                                $("#sciencePage3").show();
                                break;
                            case 4:
                                $(".aaa").hide();
                                $("#sciencePage4").show();
                                break;
                            case 5:
                                $(".aaa").hide();
                                $("#sciencePage5").show();
                                break;
                            case 6:
                                $(".aaa").hide();
                                $("#sciencePage6").show();
                                break;
                            case 7:
                                $(".aaa").hide();
                                $("#sciencePage7").show();
                                break;
                            case 8:
                                $(".aaa").hide();
                                $("#sciencePage8").show();
                                break;
                            case 9:
                                $(".aaa").hide();
                                $("#sciencePage9").show();
                                break;
                            case 10:
                                $(".aaa").hide();
                                $("#sciencePage10").show();
                                break;
                            case 11:
                                $(".aaa").hide();
                                $("#sciencePage12").show();
                                break;
                            case 12:
                                $(".aaa").hide();
                                $("#sciencePage12").show();
                                break;
                            case 13:
                                $(".aaa").hide();
                                $("#sciencePage13").show();
                                break;
                            case 14:
                                $(".aaa").hide();
                                $("#sciencePage14").show();
                                break;
                            case 15:
                                $(".aaa").hide();
                                $("#sciencePage15").show();
                                break;
                            case 16:
                                $(".aaa").hide();
                                $("#sciencePage16").show();
                                break;
                            case 17:
                                $(".aaa").hide();
                                $("#sciencePage17").show();
                                break;
                            case 18:
                                $(".aaa").hide();
                                $("#sciencePage18").show();
                                break;
                            case 19:
                                $(".aaa").hide();
                                $("#sciencePage19").show();
                                break;
                            case 20:
                                $(".aaa").hide();
                                $("#sciencePage20").show();
                                break;
                            case 21:
                                $(".aaa").hide();
                                $("#sciencePage21").show();
                                break;
                            case 22:
                                $(".aaa").hide();
                                $("#z4").show();
                                break;
                            case 23:
                                if(myService.n == 0)
                                {
                                    $(".aaa").hide();
                                    $("#scienceRestudy").show();
                                    $(".scienceNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#scienceRestudy2").show();
                                        $(".scienceNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#scienceRestudy3").show();
                                            $(".scienceNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#scienceRestudy4").show();
                                                $(".scienceNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#scienceRestudy5").show();
                                                    $(".scienceNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#scienceRestudy6").show();
                                                        $(".scienceNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#scienceRestudy7").show();
                                                            $(".scienceNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#scienceRestudy8").show();
                                                                $(".scienceNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#scienceRestudy9").show();
                                                                    $(".scienceNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#scienceRestudy10").show();
                                                                        $(".scienceNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#scienceQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });

                                }
                                else{
                                    $(".aaa").hide();
                                    $("#scienceRestudyB").show();
                                    $(".scienceNextPage").click(function () {
                                        $(".aaa").hide();
                                        $("#scienceRestudy2B").show();
                                        $(".scienceNextPage").click(function () {
                                            $(".aaa").hide();
                                            $("#scienceRestudy3B").show();
                                            $(".scienceNextPage").click(function () {
                                                $(".aaa").hide();
                                                $("#scienceRestudy4B").show();
                                                $(".scienceNextPage").click(function () {
                                                    $(".aaa").hide();
                                                    $("#scienceRestudy5B").show();
                                                    $(".scienceNextPage").click(function () {
                                                        $(".aaa").hide();
                                                        $("#scienceRestudy6B").show();
                                                        $(".scienceNextPage").click(function () {
                                                            $(".aaa").hide();
                                                            $("#scienceRestudy7B").show();
                                                            $(".scienceNextPage").click(function () {
                                                                $(".aaa").hide();
                                                                $("#scienceRestudy8B").show();
                                                                $(".scienceNextPage").click(function () {
                                                                    $(".aaa").hide();
                                                                    $("#scienceRestudy9B").show();
                                                                    $(".scienceNextPage").click(function () {
                                                                        $(".aaa").hide();
                                                                        $("#scienceRestudy10B").show();
                                                                        $(".scienceNextPage").click(function () {
                                                                            $(".aaa").hide();
                                                                            $("#scienceQuiz").show();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });

                                        });
                                    });
                                }
                                break;
                        }
                    });
                    tutorial_init();
                    tutorial_init2();
                }]
        );

})();

