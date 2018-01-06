// survey.js
(function(){
    angular.module('quizMeApp')
        .controller('surveyCtrl',
            ['$scope','$location','myService',
                function surveyCtrl( $scope, $location, myService ) {
                    'use strict';
                    $scope.meta = {
                        title: "Survey Page"
                    };

                    var helpfulVal, appropriateVal, easyVal;
                    var surveyTaken;

                    var surveyQuiz_init = function() {
                        // Pull quiz results data from service
                        $scope.number_correct = myService.numCorrect;
                        $scope.number_incorrect = myService.numIncorrect;
                        $scope.number_tossed = myService.numTossed;
                        //$scope.number_correct = sum_arr(quiz_finishedQuiz.correctMap);
                        //$scope.number_incorrect = sum_arr(quiz_finishedQuiz.incorrectMap);
                        //$scope.number_tossed = sum_arr(quiz_finishedQuiz.tossedMap);

                        // Initialize form feedback values
                        helpfulVal = 0;
                        appropriateVal = 0;
                        easyVal = 0;
                        surveyTaken = false;

                        // Send pageview
                        ga('set', 'page', '/surveyQuiz');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /surveyQuiz");

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

                    $scope.Nextstep = function() {
                        //$location.url("#quiz/");
                        window.location.href = "#tutorial/";
                    }

                    $scope.consume_feedback = function() {

                        // collect
                        // _Val collected locally
                        var docID = myService.docID;
                        var helpfulComment = document.getElementById("helpful-comments").value;
                        var appropriateComment = document.getElementById("appropriate-comments").value;
                        var easyComment = document.getElementById("easy-comments").value;

                        // if blank... do nothing with the data
                        if (helpfulComment === appropriateComment === easyComment === "" && easyVal === appropriateVal === helpfulVal === 0 ) {
                            return;
                        }

                        // format
                        // {
                        //     "docID" : [0-9]*,
                        //     "helpfulVal": [0-7],
                        //     "helpfulComment": "any text of any length",
                        //     "appropriateVal": [0-7],
                        //     "appropriateComment": "any text of any length",
                        //     "easyVal": [0-7],
                        //     "easyComment": "any text of any length",
                        // }

                        var feedback = {
                            "docID":	docID,
                            "helpfulVal":	helpfulVal,
                            "helpfulComment":	helpfulComment,
                            "appropriateVal":	appropriateVal,
                            "appropriateComment":	appropriateComment,
                            "easyVal":	easyVal,
                            "easyComment":	easyComment
                        };

                        console.log(feedback);

                        // send ...
                        $.ajax({
                            type: "POST",
                            url: './surveyResults',
                            //contentType: "application/json",
                            data: feedback,
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

                        // clear field
                        clearVal();
                        document.getElementById("helpful-comments").value = "";
                        document.getElementById("appropriate-comments").value = "";
                        document.getElementById("easy-comments").value = "";

                        surveyTaken = true;

                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                        // Send pageview
                        ga('set', 'page', '/surveyQuiz-submit');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /surveyQuiz-submit");

                        return;
                    }

                    var clearVal = function() {
                        clearBtn("helpful");
                        clearBtn("appropriate");
                        clearBtn("easy");
                        easyVal = 0;
                        appropriateVal = 0;
                        helpfulVal = 0;
                        return;
                    }

                    // the buttons
                    var clearBtn = function(s) {
                        if (s === "helpful" | s === "appropriate" | s === "easy" ){
                            for (var i = 1; i < 8; i++) {
                                var elId = s+'_'+i
                                var el = document.getElementById(elId);
                                el.className = "";
                            }
                            return;
                        }
                        console.log("something has got terrbily wrong in clearBtn of surveyQuiz.js");
                        return;
                    }
                    var setVal = function(s,n) {
                        if (s === "helpful") {
                            helpfulVal = n;
                            return;
                        } if ( s === "appropriate" ) {
                            appropriateVal = n;
                            return;
                        } if ( s === "easy" ) {
                            easyVal = n;
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
                    var setFocus = function(s) {
                        if (s === "helpful" | s === "appropriate" | s === "easy" ){
                            var elId = s+"-comments";
                            var el = document.getElementById(elId);
                            el.focus();
                            return;
                        }
                        console.log("something has got terrbily wrong in setFocus of surveyQuiz.js");
                        return;
                    }
                    var valCtrl = function(s,n) {
                        clearBtn(s);
                        setBtn(s, n);
                        setVal(s,n);
                        setFocus(s);
                        return;
                    }
                    // helpful
                    var helpfulCtrl = function(n) {
                        var s = "helpful";
                        valCtrl(s,n);
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

                    surveyQuiz_init();
                }]
        );
})();