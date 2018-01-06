/* day3.js */
/* This will run the return of users */
angular.module('quizMeApp')
    .controller('Day3Ctrl',
        ['$scope', 'myService',
            function ReturnCtrl($scope, myService) {
                'use strict';
                $scope.meta = {
                    title: "Day 3 Page"
                };
                $(".aaa").hide();
                $(".day3-button").click(function () {
                    $(".aaa").hide();
                    $("#pageOne").show();
                    $(".name-button").click(function () {
                        $(".aaa").hide();
                        $("#pageTwo").show();
                        $(".submitSurvey").click(function () {
                            $(".aaa").hide();
                            $("#pagethree").show();
                        });
                    });
                });
                var returnID;
                var validReturnID;
                var surveyTaken;
                var day3_init = function () {
                    document.getElementById("identikey-box").value = "";
                    document.getElementById("identikey-box").readOnly = false;
                    document.getElementById("identikey-box").focus();
                    myService.identikey = "";
                    myService.subject = "";
                    validReturnID = false;
                    returnID = "";
                    surveyTaken=false;
                    ga('set', 'page', '/day3');
                    ga('send', 'pageview');
                    console.log("Google Analytics pageview sent: /day3");
                };
                $scope.validReturnID = function () {
                    return validReturnID;
                }

                // helper functions
                var isValidReturnID = function () {
                    returnID = myService.returnID;
                    console.log(returnID);
                    if (returnID == "") {
                        return false;
                    }
                    var ret = sendUserData();
                    return ret;
                };
                var sendUserData = function () {

                    // Create JSON object to send
                    var returnData = {
                        "returnID": returnID
                    };
                    var returnURL = "./returnId=" + returnID;
                    console.log(returnURL);
                    var ret = $.ajax({
                        async: true,
                        url: returnURL,
                        type: 'GET',
                        data: returnData,
                        success: function (data) {
                            console.log("FRONTEND ReturnUser: returned " + data);
                            //response = JSON.parse(data);
                            // If the data returned is empty ignore it and inform the user that the code is incorrect
                            //if (!data[0]) {
                            //    console.log("Empty");
                            //    returnKeyValidationCallback(false);
                            //}
                            // If data is returned save it
                            $.each(data, function (index, value) {
                                console.log(value.identikey);
                                myService.identiKey = value.identikey;
                                myService.subject = value.subject;
                                myService.name = value.name;
                            });
                            // If the data returned is empty ignore it and inform the user that the code is incorrect
                            if (!data[0]) {
                                console.log("Empty");
                                returnKeyValidationCallback(false);
                            }
                            else {
                                returnKeyValidationCallback(true);
                            }

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //replace the console.log with redirect to error page
                            console.error(errorThrown + ": " + XMLHttpRequest.responseText);
                            returnKeyValidationCallback(false);
                        }
                    });
                }
                var clearIdentikey = function () {
                    document.getElementById("identikey-box").value = "";
                };

                $scope.QuizMe = function () {
                    myService.returnID = document.getElementById("identikey-box").value;
                    var re = /\S+@\S+\.\S+/;
                    if (re.test(myService.returnID)) {
                        isValidReturnID();
                    }
                    else {
                        alert('Please use a valid Return Email.');
                        clearIdentikey();
                    }
                    return;
                }
                var returnKeyValidationCallback = function(validID) {
                    if (validID) {
                        validReturnID = true;
                        document.getElementById('identikey-box').disabled = true;
                        $scope.$apply(); // Force Angular to update
                    } else {
                        alert('Please use a valid IdentiKey username.');
                        clearIdentikey();
                    };
                    return;
                };

                var additionalSurvey1Day3, additionalSurvey2Day3, additionalSurvey3Day3, additionalSurvey4Day3, additionalSurvey5Day3, additionalSurvey6Day3,
                    question1, question2, question3,question4, question5, question6,question7, question8, question9,question10,
                    question11, question12, question13,question14, question15, question16,question17, question18, question19,question20,
                    question21, question22, question23,question24, question25, question26,question27, question28, question29,question30,
                    question31, question32, question33,question34, question35, question36,question37, question38, question39,question40,
                    question41, question42, question43,question44, question45, question46,question47, question48, question49,question50,
                    question51, question52, question53,question54, question55, question56,question57, question58, question59,question60,
                    question61, question62, question63,question64, question65, question66,question67, question68, question69,question70,
                    question71, question72, question73,question74, question75, question76,question77, question78, question79,question80,
                    question81, question82, question83,question84, question85, question86,question87, question88, question89,question90,
                    question91, question92, question93,question94;
                var surveyTaken;


                var finishedQuiz_init = function() {
                    // Pull quiz results data from service
                    //$scope.number_correct = myService.numCorrect;
                    //$scope.number_incorrect = myService.numIncorrect;
                    //$scope.number_tossed = myService.numTossed;
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
                $scope.consume_tutorialFeedback = function() {

                    var docID = myService.docID;
                    var name = myService.name;

                    var userInfo = {
                        "returnID": returnID,
                        "name" : name
                    };
                    var tutorialFeedback = {
                        // "docID":	docID,
                        "identiKey": returnID,
                        "name": name,
                        "additionalSurvey1Day3": additionalSurvey1Day3,
                        "additionalSurvey2Day3": additionalSurvey2Day3,
                        "additionalSurvey3Day3": additionalSurvey3Day3,
                        "additionalSurvey4Day3": additionalSurvey4Day3,
                        "additionalSurvey5Day3": additionalSurvey5Day3,
                        "additionalSurvey6Day3": additionalSurvey6Day3,
                        "question1": question1,
                        "question2": question2,
                        "question3": question3,
                        "question4": question4,
                        "question5": question5,
                        "question6": question6,
                        "question7": question7,
                        "question8": question8,
                        "question9": question9,
                        "question10": question10,
                        "question11": question11,
                        "question12": question12,
                        "question13": question13,
                        "question14": question14,
                        "question15": question15,
                        "question16": question16,
                        "question17": question17,
                        "question18": question18,
                        "question19": question19,
                        "question20": question20,
                        "question21": question21,
                        "question22": question22,
                        "question23": question23,
                        "question24": question24,
                        "question25": question25,
                        "question26": question26,
                        "question27": question27,
                        "question28": question28,
                        "question29": question29,
                        "question30": question30,
                        "question31": question31,
                        "question32": question32,
                        "question33": question33,
                        "question34": question34,
                        "question35": question35,
                        "question36": question36,
                        "question37": question37,
                        "question38": question38,
                        "question39": question39,
                        "question40": question40,
                        "question41": question41,
                        "question42": question42,
                        "question43": question43,
                        "question44": question44,
                        "question45": question45,
                        "question46": question46,
                        "question47": question47,
                        "question48": question48,
                        "question49": question49,
                        "question50": question50,
                        "question51": question51,
                        "question52": question52,
                        "question53": question53,
                        "question54": question54,
                        "question55": question55,
                        "question56": question56,
                        "question57": question57,
                        "question58": question58,
                        "question59": question59,
                        "question60": question60,
                        "question61": question61,
                        "question62": question62,
                        "question63": question63,
                        "question64": question64,
                        "question65": question65,
                        "question66": question66,
                        "question67": question67,
                        "question68": question68,
                        "question69": question69,
                        "question70": question70,
                        "question71": question71,
                        "question72": question72,
                        "question73": question73,
                        "question74": question74,
                        "question75": question75,
                        "question76": question76,
                        "question77": question77,
                        "question78": question78,
                        "question79": question79,
                        "question80": question80,
                        "question81": question81,
                        "question82": question82,
                        "question83": question83,
                        "question84": question84,
                        "question85": question85,
                        "question86": question86,
                        "question87": question87,
                        "question88": question88,
                        "question89": question89,
                        "question90": question90,
                        "question91": question91,
                        "question92": question92,
                        "question93": question93,
                        "question94": question94

                    };

                    console.log(tutorialFeedback);

                    console.log(userInfo);

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
                    $.ajax({
                        type: "POST",
                        url: './finishedDayThree',
                        //contentType: "application/json",
                        data: userInfo,
                        dataType: false,
                        // data received from backend doesn't really need to be presented to the user....
                        success: function (data) {
                            console.log('Finished Updated successful!\n' + data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //replace the console.log with redirect to error page
                            console.error(errorThrown + ": " + XMLHttpRequest.responseText);
                        }
                    });

                    surveyTaken = true;

                    document.body.scrollTop = document.documentElement.scrollTop = 0;

                    // Send pageview
                    ga('set', 'page', '/survey-submit');
                    ga('send', 'pageview');
                    console.log("Google Analytics pageview sent: /survey-submit");

                    return;
                }

                var clearVal = function() {
                    clearBtn("additionalSurvey1Day3");
                    clearBtn("additionalSurvey2Day3");
                    clearBtn("additionalSurvey3Day3");
                    clearBtn("additionalSurvey4Day3");
                    clearBtn("additionalSurvey5Day3");
                    clearBtn("additionalSurvey6Day3");
                    clearBtn("question1");
                    clearBtn("question2");
                    clearBtn("question3");
                    clearBtn("question4");
                    clearBtn("question5");
                    clearBtn("question6");
                    clearBtn("question7");
                    clearBtn("question8");
                    clearBtn("question9");
                    clearBtn("question10");
                    clearBtn("question11");
                    clearBtn("question12");
                    clearBtn("question13");
                    clearBtn("question14");
                    clearBtn("question15");
                    clearBtn("question16");
                    clearBtn("question17");
                    clearBtn("question18");
                    clearBtn("question19");
                    clearBtn("question20");
                    clearBtn("question21");
                    clearBtn("question22");
                    clearBtn("question23");
                    clearBtn("question24");
                    clearBtn("question25");
                    clearBtn("question26");
                    clearBtn("question27");
                    clearBtn("question28");
                    clearBtn("question29");
                    clearBtn("question30");
                    clearBtn("question31");
                    clearBtn("question32");
                    clearBtn("question33");
                    clearBtn("question34");
                    clearBtn("question35");
                    clearBtn("question36");
                    clearBtn("question37");
                    clearBtn("question38");
                    clearBtn("question39");
                    clearBtn("question40");
                    clearBtn("question41");
                    clearBtn("question42");
                    clearBtn("question43");
                    clearBtn("question44");
                    clearBtn("question45");
                    clearBtn("question46");
                    clearBtn("question47");
                    clearBtn("question48");
                    clearBtn("question49");
                    clearBtn("question50");
                    clearBtn("question51");
                    clearBtn("question52");
                    clearBtn("question53");
                    clearBtn("question54");
                    clearBtn("question55");
                    clearBtn("question56");
                    clearBtn("question57");
                    clearBtn("question58");
                    clearBtn("question59");
                    clearBtn("question60");
                    clearBtn("question61");
                    clearBtn("question62");
                    clearBtn("question63");
                    clearBtn("question64");
                    clearBtn("question65");
                    clearBtn("question66");
                    clearBtn("question67");
                    clearBtn("question68");
                    clearBtn("question69");
                    clearBtn("question70");
                    clearBtn("question71");
                    clearBtn("question72");
                    clearBtn("question73");
                    clearBtn("question74");
                    clearBtn("question75");
                    clearBtn("question76");
                    clearBtn("question77");
                    clearBtn("question78");
                    clearBtn("question79");
                    clearBtn("question80");
                    clearBtn("question81");
                    clearBtn("question82");
                    clearBtn("question83");
                    clearBtn("question84");
                    clearBtn("question85");
                    clearBtn("question86");
                    clearBtn("question87");
                    clearBtn("question88");
                    clearBtn("question89");
                    clearBtn("question90");
                    clearBtn("question91");
                    clearBtn("question92");
                    clearBtn("question93");
                    clearBtn("question94");
                    return;
                }

                var clearBtn = function(s) {
                    if (s === "additionalSurvey1Day3" | s === "additionalSurvey2Day3" | s === "additionalSurvey3Day3"| s === "additionalSurvey4Day3" | s === "additionalSurvey5Day3"| s === "additionalSurvey6Day3"
                        |s === "question1" | s === "question2" | s === "question3"| s === "question4" | s === "question5"| s === "question6" | s === "question7"| s === "question8" | s === "question9"| s === "question10"
                        | s === "question11" | s === "question12" | s === "question13"| s === "question14" | s === "question15"| s === "question16" | s === "question17"| s === "question18" | s === "question19"| s === "question20"
                        | s === "question21" | s === "question22" | s === "question23"| s === "question24" | s === "question25"| s === "question26" | s === "question27"| s === "question28" | s === "question29"| s === "question30"
                        | s === "question31" | s === "question32" | s === "question33"| s === "question34" | s === "question35"| s === "question36" | s === "question37"| s === "question38" | s === "question39"| s === "question40"
                        | s === "question41" | s === "question42" | s === "question43"| s === "question44" | s === "question45"| s === "question46" | s === "question47"| s === "question48" | s === "question49"| s === "question50"
                        | s === "question51" | s === "question52" | s === "question53"| s === "question54" | s === "question55"| s === "question56" | s === "question57"| s === "question58" | s === "question59"| s === "question60"
                        | s === "question61" | s === "question62" | s === "question63"| s === "question64" | s === "question65"| s === "question66" | s === "question67"| s === "question68" | s === "question69"| s === "question70"
                        | s === "question71" | s === "question72" | s === "question73"| s === "question74" | s === "question75"| s === "question76" | s === "question77"| s === "question78" | s === "question79"| s === "question80"
                        | s === "question81" | s === "question82" | s === "question83"| s === "question84" | s === "question85"| s === "question86" | s === "question87"| s === "question88" | s === "question89"| s === "question90"
                        | s === "question91" | s === "question92" | s === "question93"| s === "question94" ){
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
                    if (s === "additionalSurvey1Day3") {
                        additionalSurvey1Day3 = n;
                        return;
                    }
                    if ( s === "additionalSurvey2Day3" ) {
                        additionalSurvey2Day3 = n;
                        return;
                    }
                    if ( s === "additionalSurvey3Day3" ) {
                        additionalSurvey3Day3 = n;
                        return;
                    }
                    if (s === "additionalSurvey4Day3") {
                        additionalSurvey4Day3 = n;
                        return;
                    }
                    if ( s === "additionalSurvey5Day3" ) {
                        additionalSurvey5Day3 = n;
                        return;
                    }
                    if ( s === "additionalSurvey6Day3" ) {
                        additionalSurvey6Day3 = n;
                        return;
                    }

                    if (s === "question1") {
                        question1 = n;
                        return;
                    }
                    if ( s === "question2" ) {
                        question2 = n;
                        return;
                    }
                    if ( s === "question3" ) {
                        question3 = n;
                        return;
                    }
                    if (s === "question4") {
                        question4 = n;
                        return;
                    }
                    if ( s === "question5" ) {
                        question5 = n;
                        return;
                    }
                    if ( s === "question6" ) {
                        question6 = n;
                        return;
                    }
                    if (s === "question7") {
                        question7 = n;
                        return;
                    }
                    if ( s === "question8" ) {
                        question8 = n;
                        return;
                    }
                    if ( s === "question9" ) {
                        question9 = n;
                        return;
                    }
                    if ( s === "question10" ) {
                        question10 = n;
                        return;
                    }
                    if (s === "question11") {
                        question11 = n;
                        return;
                    }
                    if ( s === "question12" ) {
                        question12 = n;
                        return;
                    }
                    if ( s === "question13" ) {
                        question13 = n;
                        return;
                    }
                    if (s === "question14") {
                        question14 = n;
                        return;
                    }
                    if ( s === "question15" ) {
                        question15 = n;
                        return;
                    }
                    if ( s === "question16" ) {
                        question16 = n;
                        return;
                    }
                    if (s === "question17") {
                        question17 = n;
                        return;
                    }
                    if ( s === "question18" ) {
                        question18 = n;
                        return;
                    }
                    if ( s === "question19" ) {
                        question19 = n;
                        return;
                    }
                    if ( s === "question20" ) {
                        question20 = n;
                        return;
                    }
                    if (s === "question21") {
                        question21 = n;
                        return;
                    }
                    if ( s === "question22" ) {
                        question22 = n;
                        return;
                    }
                    if ( s === "question23" ) {
                        question23 = n;
                        return;
                    }
                    if (s === "question24") {
                        question24 = n;
                        return;
                    }
                    if ( s === "question25" ) {
                        question25 = n;
                        return;
                    }
                    if ( s === "question26" ) {
                        question26 = n;
                        return;
                    }
                    if (s === "question27") {
                        question27 = n;
                        return;
                    }
                    if ( s === "question28" ) {
                        question28 = n;
                        return;
                    }
                    if ( s === "question29" ) {
                        question29 = n;
                        return;
                    }
                    if ( s === "question30" ) {
                        question30 = n;
                        return;
                    }
                    if (s === "question31") {
                        question31 = n;
                        return;
                    }
                    if ( s === "question32" ) {
                        question32 = n;
                        return;
                    }
                    if ( s === "question33" ) {
                        question33 = n;
                        return;
                    }
                    if (s === "question34") {
                        question34 = n;
                        return;
                    }
                    if ( s === "question35" ) {
                        question35 = n;
                        return;
                    }
                    if ( s === "question36" ) {
                        question36 = n;
                        return;
                    }
                    if (s === "question37") {
                        question37 = n;
                        return;
                    }
                    if ( s === "question38" ) {
                        question38 = n;
                        return;
                    }
                    if ( s === "question39" ) {
                        question39 = n;
                        return;
                    }
                    if ( s === "question40" ) {
                        question40 = n;
                        return;
                    }
                    if (s === "question41") {
                        question41 = n;
                        return;
                    }
                    if ( s === "question42" ) {
                        question42 = n;
                        return;
                    }
                    if ( s === "question43" ) {
                        question43 = n;
                        return;
                    }
                    if (s === "question44") {
                        question44 = n;
                        return;
                    }
                    if ( s === "question45" ) {
                        question45 = n;
                        return;
                    }
                    if ( s === "question46" ) {
                        question46 = n;
                        return;
                    }
                    if (s === "question47") {
                        question47 = n;
                        return;
                    }
                    if ( s === "question48" ) {
                        question48 = n;
                        return;
                    }
                    if ( s === "question49" ) {
                        question49 = n;
                        return;
                    }
                    if ( s === "question50" ) {
                        question50 = n;
                        return;
                    }
                    if (s === "question51") {
                        question51 = n;
                        return;
                    }
                    if ( s === "question52" ) {
                        question52 = n;
                        return;
                    }
                    if ( s === "question53" ) {
                        question53 = n;
                        return;
                    }
                    if (s === "question54") {
                        question54 = n;
                        return;
                    }
                    if ( s === "question55" ) {
                        question55 = n;
                        return;
                    }
                    if ( s === "question56" ) {
                        question56 = n;
                        return;
                    }
                    if (s === "question57") {
                        question57 = n;
                        return;
                    }
                    if ( s === "question58" ) {
                        question58 = n;
                        return;
                    }
                    if ( s === "question59" ) {
                        question59 = n;
                        return;
                    }
                    if ( s === "question60" ) {
                        question60 = n;
                        return;
                    }
                    if (s === "question61") {
                        question61 = n;
                        return;
                    }
                    if ( s === "question62" ) {
                        question62 = n;
                        return;
                    }
                    if ( s === "question63" ) {
                        question63 = n;
                        return;
                    }
                    if (s === "question64") {
                        question64 = n;
                        return;
                    }
                    if ( s === "question65" ) {
                        question65 = n;
                        return;
                    }
                    if ( s === "question66" ) {
                        question66 = n;
                        return;
                    }
                    if (s === "question67") {
                        question67 = n;
                        return;
                    }
                    if ( s === "question68" ) {
                        question68 = n;
                        return;
                    }
                    if ( s === "question69" ) {
                        question69 = n;
                        return;
                    }
                    if ( s === "question70" ) {
                        question70 = n;
                        return;
                    }
                    if (s === "question71") {
                        question71 = n;
                        return;
                    }
                    if ( s === "question72" ) {
                        question72 = n;
                        return;
                    }
                    if ( s === "question73" ) {
                        question73 = n;
                        return;
                    }
                    if (s === "question74") {
                        question74 = n;
                        return;
                    }
                    if ( s === "question75" ) {
                        question75 = n;
                        return;
                    }
                    if ( s === "question76" ) {
                        question76 = n;
                        return;
                    }
                    if (s === "question77") {
                        question77 = n;
                        return;
                    }
                    if ( s === "question78" ) {
                        question78 = n;
                        return;
                    }
                    if ( s === "question79" ) {
                        question79 = n;
                        return;
                    }
                    if ( s === "question80" ) {
                        question80 = n;
                        return;
                    }
                    if (s === "question81") {
                        question81 = n;
                        return;
                    }
                    if ( s === "question82" ) {
                        question82 = n;
                        return;
                    }
                    if ( s === "question83" ) {
                        question83 = n;
                        return;
                    }
                    if (s === "question84") {
                        question84 = n;
                        return;
                    }
                    if ( s === "question85" ) {
                        question85 = n;
                        return;
                    }
                    if ( s === "question86" ) {
                        question86 = n;
                        return;
                    }
                    if (s === "question87") {
                        question87 = n;
                        return;
                    }
                    if ( s === "question88" ) {
                        question88 = n;
                        return;
                    }
                    if ( s === "question89" ) {
                        question89 = n;
                        return;
                    }
                    if ( s === "question90" ) {
                        question90 = n;
                        return;
                    }
                    if ( s === "question91" ) {
                        question91 = n;
                        return;
                    }
                    if (s === "question92") {
                        question92 = n;
                        return;
                    }
                    if ( s === "question93" ) {
                        question93 = n;
                        return;
                    }
                    if ( s === "question94" ) {
                        question94 = n;
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

                var valCtrl = function(s,n) {
                    clearBtn(s);
                    setBtn(s, n);
                    setVal(s,n);
                    //setFocus(s);
                    return;
                }

                // Additional Survey Questions
                var easyCtrl1 = function(n) {
                    var s = "additionalSurvey1Day3";
                    valCtrl(s,n);
                    return;
                };
                $scope.additionalSurvey1Day3_1 = function (){
                    easyCtrl1(1);
                    return;
                }; $scope.additionalSurvey1Day3_2 = function (){
                    easyCtrl1(2);
                    return;
                }; $scope.additionalSurvey1Day3_3 = function (){
                    easyCtrl1(3);
                    return;
                }; $scope.additionalSurvey1Day3_4 = function (){
                    easyCtrl1(4);
                    return;
                }; $scope.additionalSurvey1Day3_5 = function (){
                    easyCtrl1(5);
                    return;
                }; $scope.additionalSurvey1Day3_6 = function (){
                    easyCtrl1(6);
                    return;
                }; $scope.additionalSurvey1Day3_7 = function (){
                    easyCtrl1(7);
                    return;
                };

                var easyCtrl2 = function(n) {
                    var s = "additionalSurvey2Day3";
                    valCtrl(s,n);
                    return;
                };
                $scope.additionalSurvey2Day3_1 = function (){
                    easyCtrl2(1);
                    return;
                }; $scope.additionalSurvey2Day3_2 = function (){
                    easyCtrl2(2);
                    return;
                }; $scope.additionalSurvey2Day3_3 = function (){
                    easyCtrl2(3);
                    return;
                }; $scope.additionalSurvey2Day3_4 = function (){
                    easyCtrl2(4);
                    return;
                }; $scope.additionalSurvey2Day3_5 = function (){
                    easyCtrl2(5);
                    return;
                }; $scope.additionalSurvey2Day3_6 = function (){
                    easyCtrl2(6);
                    return;
                }; $scope.additionalSurvey2Day3_7 = function (){
                    easyCtrl2(7);
                    return;
                };

                var easyCtrl3 = function(n) {
                    var s = "additionalSurvey3Day3";
                    valCtrl(s,n);
                    return;
                };
                $scope.additionalSurvey3Day3_1 = function (){
                    easyCtrl3(1);
                    return;
                }; $scope.additionalSurvey3Day3_2 = function (){
                    easyCtrl3(2);
                    return;
                }; $scope.additionalSurvey3Day3_3 = function (){
                    easyCtrl3(3);
                    return;
                }; $scope.additionalSurvey3Day3_4 = function (){
                    easyCtrl3(4);
                    return;
                }; $scope.additionalSurvey3Day3_5 = function (){
                    easyCtrl3(5);
                    return;
                }; $scope.additionalSurvey3Day3_6 = function (){
                    easyCtrl3(6);
                    return;
                }; $scope.additionalSurvey3Day3_7 = function (){
                    easyCtrl3(7);
                    return;
                };

                var easyCtrl4 = function(n) {
                    var s = "additionalSurvey4Day3";
                    valCtrl(s,n);
                    return;
                };
                $scope.additionalSurvey4Day3_1 = function (){
                    easyCtrl4(1);
                    return;
                }; $scope.additionalSurvey4Day3_2 = function (){
                    easyCtrl4(2);
                    return;
                }; $scope.additionalSurvey4Day3_3 = function (){
                    easyCtrl4(3);
                    return;
                }; $scope.additionalSurvey4Day3_4 = function (){
                    easyCtrl4(4);
                    return;
                }; $scope.additionalSurvey4Day3_5 = function (){
                    easyCtrl4(5);
                    return;
                }; $scope.additionalSurvey4Day3_6 = function (){
                    easyCtrl4(6);
                    return;
                }; $scope.additionalSurvey4Day3_7 = function (){
                    easyCtrl4(7);
                    return;
                };

                var easyCtrl5 = function(n) {
                    var s = "additionalSurvey5Day3";
                    valCtrl(s,n);
                    return;
                };
                $scope.additionalSurvey5Day3_1 = function (){
                    easyCtrl5(1);
                    return;
                }; $scope.additionalSurvey5Day3_2 = function (){
                    easyCtrl5(2);
                    return;
                }; $scope.additionalSurvey5Day3_3 = function (){
                    easyCtrl5(3);
                    return;
                }; $scope.additionalSurvey5Day3_4 = function (){
                    easyCtrl5(4);
                    return;
                }; $scope.additionalSurvey5Day3_5 = function (){
                    easyCtrl5(5);
                    return;
                }; $scope.additionalSurvey5Day3_6 = function (){
                    easyCtrl5(6);
                    return;
                }; $scope.additionalSurvey5Day3_7 = function (){
                    easyCtrl5(7);
                    return;
                };

                var easyCtrl6 = function(n) {
                    var s = "additionalSurvey6Day3";
                    valCtrl(s,n);
                    return;
                };
                $scope.additionalSurvey6Day3_1 = function (){
                    easyCtrl6(1);
                    return;
                }; $scope.additionalSurvey6Day3_2 = function (){
                    easyCtrl6(2);
                    return;
                }; $scope.additionalSurvey6Day3_3 = function (){
                    easyCtrl6(3);
                    return;
                }; $scope.additionalSurvey6Day3_4 = function (){
                    easyCtrl6(4);
                    return;
                }; $scope.additionalSurvey6Day3_5 = function (){
                    easyCtrl6(5);
                    return;
                }; $scope.additionalSurvey6Day3_6 = function (){
                    easyCtrl6(6);
                    return;
                }; $scope.additionalSurvey6Day3_7 = function (){
                    easyCtrl6(7);
                    return;
                };

                // helpful
                var helpfulCtrl = function(n) {
                    var s = "question1";
                    valCtrl(s,n);
                    return;
                }

                $scope.question1_1 = function (){
                    helpfulCtrl(1);
                    return;
                };$scope.question1_2 = function (){
                    helpfulCtrl(2);
                    return;
                };$scope.question1_3 = function (){
                    helpfulCtrl(3);
                    return;
                };$scope.question1_4 = function (){
                    helpfulCtrl(4);
                    return;
                };$scope.question1_5 = function (){
                    helpfulCtrl(5);
                    return;
                };$scope.question1_6 = function (){
                    helpfulCtrl(6);
                    return;
                };$scope.question1_7 = function (){
                    helpfulCtrl(7);
                    return;
                };
                // appropriate
                var appropriateCtrl = function(n) {
                    var s = "question2";
                    valCtrl(s,n);
                    return;
                }
                $scope.question2_1 = function (){
                    appropriateCtrl(1);
                    return;
                }; $scope.question2_2 = function (){
                    appropriateCtrl(2);
                    return;
                }; $scope.question2_3 = function (){
                    appropriateCtrl(3);
                    return;
                }; $scope.question2_4 = function (){
                    appropriateCtrl(4);
                    return;
                }; $scope.question2_5 = function (){
                    appropriateCtrl(5);
                    return;
                }; $scope.question2_6 = function (){
                    appropriateCtrl(6);
                    return;
                }; $scope.question2_7 = function (){
                    appropriateCtrl(7);
                    return;
                };
                // easy
                var easyCtrl = function(n) {
                    var s = "question3";
                    valCtrl(s,n);
                    return;
                };
                $scope.question3_1 = function (){
                    easyCtrl(1);
                    return;
                }; $scope.question3_2 = function (){
                    easyCtrl(2);
                    return;
                }; $scope.question3_3 = function (){
                    easyCtrl(3);
                    return;
                }; $scope.question3_4 = function (){
                    easyCtrl(4);
                    return;
                }; $scope.question3_5 = function (){
                    easyCtrl(5);
                    return;
                }; $scope.question3_6 = function (){
                    easyCtrl(6);
                    return;
                }; $scope.question3_7 = function (){
                    easyCtrl(7);
                    return;
                };
                var helpfulCtrl4 = function(n) {
                    var s = "question4";
                    valCtrl(s,n);
                    return;
                }

                $scope.question4_1 = function (){
                    helpfulCtrl4(1);
                    return;
                };$scope.question4_2 = function (){
                    helpfulCtrl4(2);
                    return;
                };$scope.question4_3 = function (){
                    helpfulCtrl4(3);
                    return;
                };$scope.question4_4 = function (){
                    helpfulCtrl4(4);
                    return;
                };$scope.question4_5 = function (){
                    helpfulCtrl4(5);
                    return;
                };$scope.question4_6 = function (){
                    helpfulCtrl4(6);
                    return;
                };$scope.question4_7 = function (){
                    helpfulCtrl4(7);
                    return;
                };
                var helpfulCtrl5 = function(n) {
                    var s = "question5";
                    valCtrl(s,n);
                    return;
                }

                $scope.question5_1 = function (){
                    helpfulCtrl5(1);
                    return;
                };$scope.question5_2 = function (){
                    helpfulCtrl5(2);
                    return;
                };$scope.question5_3 = function (){
                    helpfulCtrl5(3);
                    return;
                };$scope.question5_4 = function (){
                    helpfulCtrl5(4);
                    return;
                };$scope.question5_5 = function (){
                    helpfulCtrl5(5);
                    return;
                };$scope.question5_6 = function (){
                    helpfulCtrl5(6);
                    return;
                };$scope.question5_7 = function (){
                    helpfulCtrl5(7);
                    return;
                };
                var helpfulCtrl6 = function(n) {
                    var s = "question6";
                    valCtrl(s,n);
                    return;
                }

                $scope.question6_1 = function (){
                    helpfulCtrl6(1);
                    return;
                };$scope.question6_2 = function (){
                    helpfulCtrl6(2);
                    return;
                };$scope.question6_3 = function (){
                    helpfulCtrl6(3);
                    return;
                };$scope.question6_4 = function (){
                    helpfulCtrl6(4);
                    return;
                };$scope.question6_5 = function (){
                    helpfulCtrl6(5);
                    return;
                };$scope.question6_6 = function (){
                    helpfulCtrl6(6);
                    return;
                };$scope.question6_7 = function (){
                    helpfulCtrl6(7);
                    return;
                };
                var helpfulCtrl7 = function(n) {
                    var s = "question7";
                    valCtrl(s,n);
                    return;
                }

                $scope.question7_1 = function (){
                    helpfulCtrl7(1);
                    return;
                };$scope.question7_2 = function (){
                    helpfulCtrl7(2);
                    return;
                };$scope.question7_3 = function (){
                    helpfulCtrl7(3);
                    return;
                };$scope.question7_4 = function (){
                    helpfulCtrl7(4);
                    return;
                };$scope.question7_5 = function (){
                    helpfulCtrl7(5);
                    return;
                };$scope.question7_6 = function (){
                    helpfulCtrl7(6);
                    return;
                };$scope.question7_7 = function (){
                    helpfulCtrl7(7);
                    return;
                };
                var helpfulCtrl8 = function(n) {
                    var s = "question8";
                    valCtrl(s,n);
                    return;
                }

                $scope.question8_1 = function (){
                    helpfulCtrl8(1);
                    return;
                };$scope.question8_2 = function (){
                    helpfulCtrl8(2);
                    return;
                };$scope.question8_3 = function (){
                    helpfulCtrl8(3);
                    return;
                };$scope.question8_4 = function (){
                    helpfulCtrl8(4);
                    return;
                };$scope.question8_5 = function (){
                    helpfulCtrl8(5);
                    return;
                };$scope.question8_6 = function (){
                    helpfulCtrl8(6);
                    return;
                };$scope.question8_7 = function (){
                    helpfulCtrl8(7);
                    return;
                };
                var helpfulCtrl9 = function(n) {
                    var s = "question9";
                    valCtrl(s,n);
                    return;
                }

                $scope.question9_1 = function (){
                    helpfulCtrl9(1);
                    return;
                };$scope.question9_2 = function (){
                    helpfulCtrl9(2);
                    return;
                };$scope.question9_3 = function (){
                    helpfulCtrl9(3);
                    return;
                };$scope.question9_4 = function (){
                    helpfulCtrl9(4);
                    return;
                };$scope.question9_5 = function (){
                    helpfulCtrl9(5);
                    return;
                };$scope.question9_6 = function (){
                    helpfulCtrl9(6);
                    return;
                };$scope.question9_7 = function (){
                    helpfulCtrl9(7);
                    return;
                };
                var helpfulCtrl10 = function(n) {
                    var s = "question10";
                    valCtrl(s,n);
                    return;
                }

                $scope.question10_1 = function (){
                    helpfulCtrl10(1);
                    return;
                };$scope.question10_2 = function (){
                    helpfulCtrl10(2);
                    return;
                };$scope.question10_3 = function (){
                    helpfulCtrl10(3);
                    return;
                };$scope.question10_4 = function (){
                    helpfulCtrl10(4);
                    return;
                };$scope.question10_5 = function (){
                    helpfulCtrl10(5);
                    return;
                };$scope.question10_6 = function (){
                    helpfulCtrl10(6);
                    return;
                };$scope.question10_7 = function (){
                    helpfulCtrl10(7);
                    return;
                };
                var helpfulCtrl11 = function(n) {
                    var s = "question11";
                    valCtrl(s,n);
                    return;
                }

                $scope.question11_1 = function (){
                    helpfulCtrl11(1);
                    return;
                };$scope.question11_2 = function (){
                    helpfulCtrl11(2);
                    return;
                };$scope.question11_3 = function (){
                    helpfulCtrl11(3);
                    return;
                };$scope.question11_4 = function (){
                    helpfulCtrl11(4);
                    return;
                };$scope.question11_5 = function (){
                    helpfulCtrl11(5);
                    return;
                };$scope.question11_6 = function (){
                    helpfulCtrl11(6);
                    return;
                };$scope.question11_7 = function (){
                    helpfulCtrl11(7);
                    return;
                };
                var helpfulCtrl12 = function(n) {
                    var s = "question12";
                    valCtrl(s,n);
                    return;
                }

                $scope.question12_1 = function (){
                    helpfulCtrl12(1);
                    return;
                };$scope.question12_2 = function (){
                    helpfulCtrl12(2);
                    return;
                };$scope.question12_3 = function (){
                    helpfulCtrl12(3);
                    return;
                };$scope.question12_4 = function (){
                    helpfulCtrl12(4);
                    return;
                };$scope.question12_5 = function (){
                    helpfulCtrl12(5);
                    return;
                };$scope.question12_6 = function (){
                    helpfulCtrl12(6);
                    return;
                };$scope.question12_7 = function (){
                    helpfulCtrl12(7);
                    return;
                };
                var helpfulCtrl13 = function(n) {
                    var s = "question13";
                    valCtrl(s,n);
                    return;
                }

                $scope.question13_1 = function (){
                    helpfulCtrl13(1);
                    return;
                };$scope.question13_2 = function (){
                    helpfulCtrl13(2);
                    return;
                };$scope.question13_3 = function (){
                    helpfulCtrl13(3);
                    return;
                };$scope.question13_4 = function (){
                    helpfulCtrl13(4);
                    return;
                };$scope.question13_5 = function (){
                    helpfulCtrl13(5);
                    return;
                };$scope.question13_6 = function (){
                    helpfulCtrl13(6);
                    return;
                };$scope.question13_7 = function (){
                    helpfulCtrl13(7);
                    return;
                };
                var helpfulCtrl14 = function(n) {
                    var s = "question14";
                    valCtrl(s,n);
                    return;
                }

                $scope.question14_1 = function (){
                    helpfulCtrl14(1);
                    return;
                };$scope.question14_2 = function (){
                    helpfulCtrl14(2);
                    return;
                };$scope.question14_3 = function (){
                    helpfulCtrl14(3);
                    return;
                };$scope.question14_4 = function (){
                    helpfulCtrl14(4);
                    return;
                };$scope.question14_5 = function (){
                    helpfulCtrl14(5);
                    return;
                };$scope.question14_6 = function (){
                    helpfulCtrl14(6);
                    return;
                };$scope.question14_7 = function (){
                    helpfulCtrl14(7);
                    return;
                };
                var helpfulCtrl15 = function(n) {
                    var s = "question15";
                    valCtrl(s,n);
                    return;
                }

                $scope.question15_1 = function (){
                    helpfulCtrl15(1);
                    return;
                };$scope.question15_2 = function (){
                    helpfulCtrl15(2);
                    return;
                };$scope.question15_3 = function (){
                    helpfulCtrl15(3);
                    return;
                };$scope.question15_4 = function (){
                    helpfulCtrl15(4);
                    return;
                };$scope.question15_5 = function (){
                    helpfulCtrl15(5);
                    return;
                };$scope.question15_6 = function (){
                    helpfulCtrl15(6);
                    return;
                };$scope.question15_7 = function (){
                    helpfulCtrl15(7);
                    return;
                };
                var helpfulCtrl16 = function(n) {
                    var s = "question16";
                    valCtrl(s,n);
                    return;
                }

                $scope.question16_1 = function (){
                    helpfulCtrl16(1);
                    return;
                };$scope.question16_2 = function (){
                    helpfulCtrl16(2);
                    return;
                };$scope.question16_3 = function (){
                    helpfulCtrl16(3);
                    return;
                };$scope.question16_4 = function (){
                    helpfulCtrl16(4);
                    return;
                };$scope.question16_5 = function (){
                    helpfulCtrl16(5);
                    return;
                };$scope.question16_6 = function (){
                    helpfulCtrl16(6);
                    return;
                };$scope.question16_7 = function (){
                    helpfulCtrl16(7);
                    return;
                };
                var helpfulCtrl17 = function(n) {
                    var s = "question17";
                    valCtrl(s,n);
                    return;
                }

                $scope.question17_1 = function (){
                    helpfulCtrl17(1);
                    return;
                };$scope.question17_2 = function (){
                    helpfulCtrl17(2);
                    return;
                };$scope.question17_3 = function (){
                    helpfulCtrl17(3);
                    return;
                };$scope.question17_4 = function (){
                    helpfulCtrl17(4);
                    return;
                };$scope.question17_5 = function (){
                    helpfulCtrl17(5);
                    return;
                };$scope.question17_6 = function (){
                    helpfulCtrl17(6);
                    return;
                };$scope.question17_7 = function (){
                    helpfulCtrl17(7);
                    return;
                };
                var helpfulCtrl18 = function(n) {
                    var s = "question18";
                    valCtrl(s,n);
                    return;
                }

                $scope.question18_1 = function (){
                    helpfulCtrl18(1);
                    return;
                };$scope.question18_2 = function (){
                    helpfulCtrl18(2);
                    return;
                };$scope.question18_3 = function (){
                    helpfulCtrl18(3);
                    return;
                };$scope.question18_4 = function (){
                    helpfulCtrl18(4);
                    return;
                };$scope.question18_5 = function (){
                    helpfulCtrl18(5);
                    return;
                };$scope.question18_6 = function (){
                    helpfulCtrl18(6);
                    return;
                };$scope.question18_7 = function (){
                    helpfulCtrl18(7);
                    return;
                };
                var helpfulCtrl19 = function(n) {
                    var s = "question19";
                    valCtrl(s,n);
                    return;
                }

                $scope.question19_1 = function (){
                    helpfulCtrl19(1);
                    return;
                };$scope.question19_2 = function (){
                    helpfulCtrl19(2);
                    return;
                };$scope.question19_3 = function (){
                    helpfulCtrl19(3);
                    return;
                };$scope.question19_4 = function (){
                    helpfulCtrl19(4);
                    return;
                };$scope.question19_5 = function (){
                    helpfulCtrl19(5);
                    return;
                };$scope.question19_6 = function (){
                    helpfulCtrl19(6);
                    return;
                };$scope.question19_7 = function (){
                    helpfulCtrl19(7);
                    return;
                };
                var helpfulCtrl20 = function(n) {
                    var s = "question20";
                    valCtrl(s,n);
                    return;
                }

                $scope.question20_1 = function (){
                    helpfulCtrl20(1);
                    return;
                };$scope.question20_2 = function (){
                    helpfulCtrl20(2);
                    return;
                };$scope.question20_3 = function (){
                    helpfulCtrl20(3);
                    return;
                };$scope.question20_4 = function (){
                    helpfulCtrl20(4);
                    return;
                };$scope.question20_5 = function (){
                    helpfulCtrl20(5);
                    return;
                };$scope.question20_6 = function (){
                    helpfulCtrl20(6);
                    return;
                };$scope.question20_7 = function (){
                    helpfulCtrl20(7);
                    return;
                };
                var helpfulCtrl21 = function(n) {
                    var s = "question21";
                    valCtrl(s,n);
                    return;
                }

                $scope.question21_1 = function (){
                    helpfulCtrl21(1);
                    return;
                };$scope.question21_2 = function (){
                    helpfulCtrl21(2);
                    return;
                };$scope.question21_3 = function (){
                    helpfulCtrl21(3);
                    return;
                };$scope.question21_4 = function (){
                    helpfulCtrl21(4);
                    return;
                };$scope.question21_5 = function (){
                    helpfulCtrl21(5);
                    return;
                };$scope.question21_6 = function (){
                    helpfulCtrl21(6);
                    return;
                };$scope.question21_7 = function (){
                    helpfulCtrl21(7);
                    return;
                };
                var helpfulCtrl22 = function(n) {
                    var s = "question22";
                    valCtrl(s,n);
                    return;
                }

                $scope.question22_1 = function (){
                    helpfulCtrl22(1);
                    return;
                };$scope.question22_2 = function (){
                    helpfulCtrl22(2);
                    return;
                };$scope.question22_3 = function (){
                    helpfulCtrl22(3);
                    return;
                };$scope.question22_4 = function (){
                    helpfulCtrl22(4);
                    return;
                };$scope.question22_5 = function (){
                    helpfulCtrl22(5);
                    return;
                };$scope.question22_6 = function (){
                    helpfulCtrl22(6);
                    return;
                };$scope.question22_7 = function (){
                    helpfulCtrl22(7);
                    return;
                };
                var helpfulCtrl23 = function(n) {
                    var s = "question23";
                    valCtrl(s,n);
                    return;
                }

                $scope.question23_1 = function (){
                    helpfulCtrl23(1);
                    return;
                };$scope.question23_2 = function (){
                    helpfulCtrl23(2);
                    return;
                };$scope.question23_3 = function (){
                    helpfulCtrl23(3);
                    return;
                };$scope.question23_4 = function (){
                    helpfulCtrl23(4);
                    return;
                };$scope.question23_5 = function (){
                    helpfulCtrl23(5);
                    return;
                };$scope.question23_6 = function (){
                    helpfulCtrl23(6);
                    return;
                };$scope.question23_7 = function (){
                    helpfulCtrl23(7);
                    return;
                };
                var helpfulCtrl24 = function(n) {
                    var s = "question24";
                    valCtrl(s,n);
                    return;
                }

                $scope.question24_1 = function (){
                    helpfulCtrl24(1);
                    return;
                };$scope.question24_2 = function (){
                    helpfulCtrl24(2);
                    return;
                };$scope.question24_3 = function (){
                    helpfulCtrl24(3);
                    return;
                };$scope.question24_4 = function (){
                    helpfulCtrl24(4);
                    return;
                };$scope.question24_5 = function (){
                    helpfulCtrl24(5);
                    return;
                };$scope.question24_6 = function (){
                    helpfulCtrl24(6);
                    return;
                };$scope.question24_7 = function (){
                    helpfulCtr24l(7);
                    return;
                };
                var helpfulCtrl25 = function(n) {
                    var s = "question25";
                    valCtrl(s,n);
                    return;
                }

                $scope.question25_1 = function (){
                    helpfulCtrl25(1);
                    return;
                };$scope.question25_2 = function (){
                    helpfulCtrl25(2);
                    return;
                };$scope.question25_3 = function (){
                    helpfulCtrl25(3);
                    return;
                };$scope.question25_4 = function (){
                    helpfulCtrl25(4);
                    return;
                };$scope.question25_5 = function (){
                    helpfulCtrl25(5);
                    return;
                };$scope.question25_6 = function (){
                    helpfulCtrl25(6);
                    return;
                };$scope.question25_7 = function (){
                    helpfulCtrl25(7);
                    return;
                };
                var helpfulCtrl26 = function(n) {
                    var s = "question26";
                    valCtrl(s,n);
                    return;
                }

                $scope.question26_1 = function (){
                    helpfulCtrl26(1);
                    return;
                };$scope.question26_2 = function (){
                    helpfulCtrl26(2);
                    return;
                };$scope.question26_3 = function (){
                    helpfulCtrl26(3);
                    return;
                };$scope.question26_4 = function (){
                    helpfulCtrl26(4);
                    return;
                };$scope.question26_5 = function (){
                    helpfulCtrl26(5);
                    return;
                };$scope.question26_6 = function (){
                    helpfulCtrl26(6);
                    return;
                };$scope.question26_7 = function (){
                    helpfulCtrl26(7);
                    return;
                };
                var helpfulCtrl27 = function(n) {
                    var s = "question27";
                    valCtrl(s,n);
                    return;
                }

                $scope.question27_1 = function (){
                    helpfulCtrl27(1);
                    return;
                };$scope.question27_2 = function (){
                    helpfulCtrl27(2);
                    return;
                };$scope.question27_3 = function (){
                    helpfulCtrl27(3);
                    return;
                };$scope.question27_4 = function (){
                    helpfulCtrl27(4);
                    return;
                };$scope.question27_5 = function (){
                    helpfulCtrl27(5);
                    return;
                };$scope.question27_6 = function (){
                    helpfulCtrl27(6);
                    return;
                };$scope.question27_7 = function (){
                    helpfulCtrl27(7);
                    return;
                };
                var helpfulCtrl28 = function(n) {
                    var s = "question28";
                    valCtrl(s,n);
                    return;
                }

                $scope.question28_1 = function (){
                    helpfulCtrl28(1);
                    return;
                };$scope.question28_2 = function (){
                    helpfulCtrl28(2);
                    return;
                };$scope.question28_3 = function (){
                    helpfulCtrl28(3);
                    return;
                };$scope.question28_4 = function (){
                    helpfulCtrl28(4);
                    return;
                };$scope.question28_5 = function (){
                    helpfulCtrl28(5);
                    return;
                };$scope.question28_6 = function (){
                    helpfulCtrl28(6);
                    return;
                };$scope.question28_7 = function (){
                    helpfulCtrl28(7);
                    return;
                };
                var helpfulCtrl29 = function(n) {
                    var s = "question29";
                    valCtrl(s,n);
                    return;
                }

                $scope.question29_1 = function (){
                    helpfulCtrl29(1);
                    return;
                };$scope.question29_2 = function (){
                    helpfulCtrl29(2);
                    return;
                };$scope.question29_3 = function (){
                    helpfulCtrl29(3);
                    return;
                };$scope.question29_4 = function (){
                    helpfulCtrl29(4);
                    return;
                };$scope.question29_5 = function (){
                    helpfulCtrl29(5);
                    return;
                };$scope.question29_6 = function (){
                    helpfulCtrl29(6);
                    return;
                };$scope.question29_7 = function (){
                    helpfulCtrl29(7);
                    return;
                };
                var helpfulCtrl30 = function(n) {
                    var s = "question30";
                    valCtrl(s,n);
                    return;
                }

                $scope.question30_1 = function (){
                    helpfulCtrl30(1);
                    return;
                };$scope.question30_2 = function (){
                    helpfulCtrl30(2);
                    return;
                };$scope.question30_3 = function (){
                    helpfulCtrl30(3);
                    return;
                };$scope.question30_4 = function (){
                    helpfulCtrl30(4);
                    return;
                };$scope.question30_5 = function (){
                    helpfulCtrl30(5);
                    return;
                };$scope.question30_6 = function (){
                    helpfulCtrl30(6);
                    return;
                };$scope.question30_7 = function (){
                    helpfulCtrl30(7);
                    return;
                };
                var helpfulCtrl31 = function(n) {
                    var s = "question31";
                    valCtrl(s,n);
                    return;
                }

                $scope.question31_1 = function (){
                    helpfulCtrl31(1);
                    return;
                };$scope.question31_2 = function (){
                    helpfulCtrl31(2);
                    return;
                };$scope.question31_3 = function (){
                    helpfulCtrl31(3);
                    return;
                };$scope.question31_4 = function (){
                    helpfulCtrl31(4);
                    return;
                };$scope.question31_5 = function (){
                    helpfulCtrl31(5);
                    return;
                };$scope.question31_6 = function (){
                    helpfulCtrl31(6);
                    return;
                };$scope.question31_7 = function (){
                    helpfulCtrl31(7);
                    return;
                };
                var helpfulCtrl32 = function(n) {
                    var s = "question32";
                    valCtrl(s,n);
                    return;
                }

                $scope.question32_1 = function (){
                    helpfulCtrl32(1);
                    return;
                };$scope.question32_2 = function (){
                    helpfulCtrl32(2);
                    return;
                };$scope.question32_3 = function (){
                    helpfulCtrl32(3);
                    return;
                };$scope.question32_4 = function (){
                    helpfulCtrl32(4);
                    return;
                };$scope.question32_5 = function (){
                    helpfulCtrl32(5);
                    return;
                };$scope.question32_6 = function (){
                    helpfulCtrl32(6);
                    return;
                };$scope.question32_7 = function (){
                    helpfulCtrl32(7);
                    return;
                };
                var helpfulCtrl33 = function(n) {
                    var s = "question33";
                    valCtrl(s,n);
                    return;
                }

                $scope.question33_1 = function (){
                    helpfulCtrl33(1);
                    return;
                };$scope.question33_2 = function (){
                    helpfulCtrl33(2);
                    return;
                };$scope.question33_3 = function (){
                    helpfulCtrl33(3);
                    return;
                };$scope.question33_4 = function (){
                    helpfulCtrl33(4);
                    return;
                };$scope.question33_5 = function (){
                    helpfulCtrl33(5);
                    return;
                };$scope.question33_6 = function (){
                    helpfulCtrl33(6);
                    return;
                };$scope.question33_7 = function (){
                    helpfulCtrl33(7);
                    return;
                };
                var helpfulCtrl34 = function(n) {
                    var s = "question34";
                    valCtrl(s,n);
                    return;
                }

                $scope.question34_1 = function (){
                    helpfulCtrl34(1);
                    return;
                };$scope.question34_2 = function (){
                    helpfulCtrl34(2);
                    return;
                };$scope.question34_3 = function (){
                    helpfulCtrl34(3);
                    return;
                };$scope.question34_4 = function (){
                    helpfulCtrl34(4);
                    return;
                };$scope.question34_5 = function (){
                    helpfulCtrl34(5);
                    return;
                };$scope.question34_6 = function (){
                    helpfulCtrl34(6);
                    return;
                };$scope.question34_7 = function (){
                    helpfulCtrl34(7);
                    return;
                };


                // helpful 35--65
                var helpfulCtrl35 = function(n) {
                    var s = "question35";
                    valCtrl(s,n);
                    return;
                }

                $scope.question35_1 = function (){
                    helpfulCtrl35(1);
                    return;
                };$scope.question35_2 = function (){
                    helpfulCtrl35(2);
                    return;
                };$scope.question35_3 = function (){
                    helpfulCtrl35(3);
                    return;
                };$scope.question35_4 = function (){
                    helpfulCtrl35(4);
                    return;
                };$scope.question35_5 = function (){
                    helpfulCtrl35(5);
                    return;
                };$scope.question35_6 = function (){
                    helpfulCtrl35(6);
                    return;
                };$scope.question35_7 = function (){
                    helpfulCtrl35(7);
                    return;
                };

                var helpfulCtrl36 = function(n) {
                    var s = "question36";
                    valCtrl(s,n);
                    return;
                }

                $scope.question36_1 = function (){
                    helpfulCtrl36(1);
                    return;
                };$scope.question36_2 = function (){
                    helpfulCtrl36(2);
                    return;
                };$scope.question36_3 = function (){
                    helpfulCtrl36(3);
                    return;
                };$scope.question36_4 = function (){
                    helpfulCtrl36(4);
                    return;
                };$scope.question36_5 = function (){
                    helpfulCtrl36(5);
                    return;
                };$scope.question36_6 = function (){
                    helpfulCtrl36(6);
                    return;
                };$scope.question36_7 = function (){
                    helpfulCtrl36(7);
                    return;
                };

                var helpfulCtrl37 = function(n) {
                    var s = "question37";
                    valCtrl(s,n);
                    return;
                }

                $scope.question37_1 = function (){
                    helpfulCtrl37(1);
                    return;
                };$scope.question37_2 = function (){
                    helpfulCtrl37(2);
                    return;
                };$scope.question37_3 = function (){
                    helpfulCtrl37(3);
                    return;
                };$scope.question37_4 = function (){
                    helpfulCtrl37(4);
                    return;
                };$scope.question37_5 = function (){
                    helpfulCtrl37(5);
                    return;
                };$scope.question37_6 = function (){
                    helpfulCtrl37(6);
                    return;
                };$scope.question37_7 = function (){
                    helpfulCtrl37(7);
                    return;
                };

                var helpfulCtrl38 = function(n) {
                    var s = "question38";
                    valCtrl(s,n);
                    return;
                }

                $scope.question38_1 = function (){
                    helpfulCtrl38(1);
                    return;
                };$scope.question38_2 = function (){
                    helpfulCtrl38(2);
                    return;
                };$scope.question38_3 = function (){
                    helpfulCtrl38(3);
                    return;
                };$scope.question38_4 = function (){
                    helpfulCtrl38(4);
                    return;
                };$scope.question38_5 = function (){
                    helpfulCtrl38(5);
                    return;
                };$scope.question38_6 = function (){
                    helpfulCtrl38(6);
                    return;
                };$scope.question38_7 = function (){
                    helpfulCtrl38(7);
                    return;
                };

                var helpfulCtrl39 = function(n) {
                    var s = "question39";
                    valCtrl(s,n);
                    return;
                }

                $scope.question39_1 = function (){
                    helpfulCtrl39(1);
                    return;
                };$scope.question39_2 = function (){
                    helpfulCtrl39(2);
                    return;
                };$scope.question39_3 = function (){
                    helpfulCtrl39(3);
                    return;
                };$scope.question39_4 = function (){
                    helpfulCtrl39(4);
                    return;
                };$scope.question39_5 = function (){
                    helpfulCtrl39(5);
                    return;
                };$scope.question39_6 = function (){
                    helpfulCtrl39(6);
                    return;
                };$scope.question39_7 = function (){
                    helpfulCtrl39(7);
                    return;
                };

                var helpfulCtrl40 = function(n) {
                    var s = "question40";
                    valCtrl(s,n);
                    return;
                }

                $scope.question40_1 = function (){
                    helpfulCtrl40(1);
                    return;
                };$scope.question40_2 = function (){
                    helpfulCtrl40(2);
                    return;
                };$scope.question40_3 = function (){
                    helpfulCtrl40(3);
                    return;
                };$scope.question40_4 = function (){
                    helpfulCtrl40(4);
                    return;
                };$scope.question40_5 = function (){
                    helpfulCtrl40(5);
                    return;
                };$scope.question40_6 = function (){
                    helpfulCtrl40(6);
                    return;
                };$scope.question40_7 = function (){
                    helpfulCtrl40(7);
                    return;
                };

                var helpfulCtrl41 = function(n) {
                    var s = "question41";
                    valCtrl(s,n);
                    return;
                }

                $scope.question41_1 = function (){
                    helpfulCtrl41(1);
                    return;
                };$scope.question41_2 = function (){
                    helpfulCtrl41(2);
                    return;
                };$scope.question41_3 = function (){
                    helpfulCtrl41(3);
                    return;
                };$scope.question41_4 = function (){
                    helpfulCtrl41(4);
                    return;
                };$scope.question41_5 = function (){
                    helpfulCtrl41(5);
                    return;
                };$scope.question41_6 = function (){
                    helpfulCtrl(6);
                    return;
                };$scope.question41_7 = function (){
                    helpfulCtrl41(7);
                    return;
                };

                var helpfulCtrl42 = function(n) {
                    var s = "question42";
                    valCtrl(s,n);
                    return;
                }

                $scope.question42_1 = function (){
                    helpfulCtrl42(1);
                    return;
                };$scope.question42_2 = function (){
                    helpfulCtrl42(2);
                    return;
                };$scope.question42_3 = function (){
                    helpfulCtrl42(3);
                    return;
                };$scope.question42_4 = function (){
                    helpfulCtrl42(4);
                    return;
                };$scope.question42_5 = function (){
                    helpfulCtrl42(5);
                    return;
                };$scope.question42_6 = function (){
                    helpfulCtrl42(6);
                    return;
                };$scope.question42_7 = function (){
                    helpfulCtrl42(7);
                    return;
                };

                var helpfulCtrl43 = function(n) {
                    var s = "question43";
                    valCtrl(s,n);
                    return;
                }

                $scope.question43_1 = function (){
                    helpfulCtrl43(1);
                    return;
                };$scope.question43_2 = function (){
                    helpfulCtrl43(2);
                    return;
                };$scope.question43_3 = function (){
                    helpfulCtrl43(3);
                    return;
                };$scope.question43_4 = function (){
                    helpfulCtrl43(4);
                    return;
                };$scope.question43_5 = function (){
                    helpfulCtrl43(5);
                    return;
                };$scope.question43_6 = function (){
                    helpfulCtrl43(6);
                    return;
                };$scope.question43_7 = function (){
                    helpfulCtrl43(7);
                    return;
                };

                var helpfulCtrl44 = function(n) {
                    var s = "question44";
                    valCtrl(s,n);
                    return;
                }

                $scope.question44_1 = function (){
                    helpfulCtrl44(1);
                    return;
                };$scope.question44_2 = function (){
                    helpfulCtrl44(2);
                    return;
                };$scope.question44_3 = function (){
                    helpfulCtrl44(3);
                    return;
                };$scope.question44_4 = function (){
                    helpfulCtrl44(4);
                    return;
                };$scope.question44_5 = function (){
                    helpfulCtrl44(5);
                    return;
                };$scope.question44_6 = function (){
                    helpfulCtrl44(6);
                    return;
                };$scope.question44_7 = function (){
                    helpfulCtrl44(7);
                    return;
                };

                var helpfulCtrl45 = function(n) {
                    var s = "question45";
                    valCtrl(s,n);
                    return;
                }

                $scope.question45_1 = function (){
                    helpfulCtrl45(1);
                    return;
                };$scope.question45_2 = function (){
                    helpfulCtrl45(2);
                    return;
                };$scope.question45_3 = function (){
                    helpfulCtrl45(3);
                    return;
                };$scope.question45_4 = function (){
                    helpfulCtrl45(4);
                    return;
                };$scope.question45_5 = function (){
                    helpfulCtrl45(5);
                    return;
                };$scope.question45_6 = function (){
                    helpfulCtrl45(6);
                    return;
                };$scope.question45_7 = function (){
                    helpfulCtrl45(7);
                    return;
                };

                var helpfulCtrl46 = function(n) {
                    var s = "question46";
                    valCtrl(s,n);
                    return;
                }

                $scope.question46_1 = function (){
                    helpfulCtrl46(1);
                    return;
                };$scope.question46_2 = function (){
                    helpfulCtrl46(2);
                    return;
                };$scope.question46_3 = function (){
                    helpfulCtrl46(3);
                    return;
                };$scope.question46_4 = function (){
                    helpfulCtrl46(4);
                    return;
                };$scope.question46_5 = function (){
                    helpfulCtrl46(5);
                    return;
                };$scope.question46_6 = function (){
                    helpfulCtrl46(6);
                    return;
                };$scope.question46_7 = function (){
                    helpfulCtrl46(7);
                    return;
                };

                var helpfulCtrl47 = function(n) {
                    var s = "question47";
                    valCtrl(s,n);
                    return;
                }

                $scope.question47_1 = function (){
                    helpfulCtrl47(1);
                    return;
                };$scope.question47_2 = function (){
                    helpfulCtrl47(2);
                    return;
                };$scope.question47_3 = function (){
                    helpfulCtrl47(3);
                    return;
                };$scope.question47_4 = function (){
                    helpfulCtrl47(4);
                    return;
                };$scope.question47_5 = function (){
                    helpfulCtrl47(5);
                    return;
                };$scope.question47_6 = function (){
                    helpfulCtrl47(6);
                    return;
                };$scope.question47_7 = function (){
                    helpfulCtrl47(7);
                    return;
                };

                var helpfulCtrl48 = function(n) {
                    var s = "question48";
                    valCtrl(s,n);
                    return;
                }

                $scope.question48_1 = function (){
                    helpfulCtrl48(1);
                    return;
                };$scope.question48_2 = function (){
                    helpfulCtrl48(2);
                    return;
                };$scope.question48_3 = function (){
                    helpfulCtrl48(3);
                    return;
                };$scope.question48_4 = function (){
                    helpfulCtrl48(4);
                    return;
                };$scope.question48_5 = function (){
                    helpfulCtrl48(5);
                    return;
                };$scope.question48_6 = function (){
                    helpfulCtrl48(6);
                    return;
                };$scope.question48_7 = function (){
                    helpfulCtrl48(7);
                    return;
                };

                var helpfulCtrl49 = function(n) {
                    var s = "question49";
                    valCtrl(s,n);
                    return;
                }

                $scope.question49_1 = function (){
                    helpfulCtrl49(1);
                    return;
                };$scope.question49_2 = function (){
                    helpfulCtrl49(2);
                    return;
                };$scope.question49_3 = function (){
                    helpfulCtrl49(3);
                    return;
                };$scope.question49_4 = function (){
                    helpfulCtrl49(4);
                    return;
                };$scope.question49_5 = function (){
                    helpfulCtrl49(5);
                    return;
                };$scope.question49_6 = function (){
                    helpfulCtrl49(6);
                    return;
                };$scope.question49_7 = function (){
                    helpfulCtrl49(7);
                    return;
                };

                var helpfulCtrl50 = function(n) {
                    var s = "question50";
                    valCtrl(s,n);
                    return;
                }

                $scope.question50_1 = function (){
                    helpfulCtrl50(1);
                    return;
                };$scope.question50_2 = function (){
                    helpfulCtrl50(2);
                    return;
                };$scope.question50_3 = function (){
                    helpfulCtrl50(3);
                    return;
                };$scope.question50_4 = function (){
                    helpfulCtrl50(4);
                    return;
                };$scope.question50_5 = function (){
                    helpfulCtrl50(5);
                    return;
                };$scope.question50_6 = function (){
                    helpfulCtrl50(6);
                    return;
                };$scope.question50_7 = function (){
                    helpfulCtrl50(7);
                    return;
                };

                var helpfulCtrl51 = function(n) {
                    var s = "question51";
                    valCtrl(s,n);
                    return;
                }

                $scope.question51_1 = function (){
                    helpfulCtrl51(1);
                    return;
                };$scope.question51_2 = function (){
                    helpfulCtrl51(2);
                    return;
                };$scope.question51_3 = function (){
                    helpfulCtrl51(3);
                    return;
                };$scope.question51_4 = function (){
                    helpfulCtrl51(4);
                    return;
                };$scope.question51_5 = function (){
                    helpfulCtrl51(5);
                    return;
                };$scope.question51_6 = function (){
                    helpfulCtrl51(6);
                    return;
                };$scope.question51_7 = function (){
                    helpfulCtrl51(7);
                    return;
                };

                var helpfulCtrl52 = function(n) {
                    var s = "question52";
                    valCtrl(s,n);
                    return;
                }

                $scope.question52_1 = function (){
                    helpfulCtrl52(1);
                    return;
                };$scope.question52_2 = function (){
                    helpfulCtrl52(2);
                    return;
                };$scope.question52_3 = function (){
                    helpfulCtrl52(3);
                    return;
                };$scope.question52_4 = function (){
                    helpfulCtrl52(4);
                    return;
                };$scope.question52_5 = function (){
                    helpfulCtrl52(5);
                    return;
                };$scope.question52_6 = function (){
                    helpfulCtrl52(6);
                    return;
                };$scope.question52_7 = function (){
                    helpfulCtrl52(7);
                    return;
                };

                var helpfulCtrl53 = function(n) {
                    var s = "question53";
                    valCtrl(s,n);
                    return;
                }

                $scope.question53_1 = function (){
                    helpfulCtrl53(1);
                    return;
                };$scope.question53_2 = function (){
                    helpfulCtrl53(2);
                    return;
                };$scope.question53_3 = function (){
                    helpfulCtrl53(3);
                    return;
                };$scope.question53_4 = function (){
                    helpfulCtrl53(4);
                    return;
                };$scope.question53_5 = function (){
                    helpfulCtrl53(5);
                    return;
                };$scope.question53_6 = function (){
                    helpfulCtrl53(6);
                    return;
                };$scope.question53_7 = function (){
                    helpfulCtrl53(7);
                    return;
                };

                var helpfulCtrl54 = function(n) {
                    var s = "question54";
                    valCtrl(s,n);
                    return;
                }

                $scope.question54_1 = function (){
                    helpfulCtrl54(1);
                    return;
                };$scope.question54_2 = function (){
                    helpfulCtrl54(2);
                    return;
                };$scope.question54_3 = function (){
                    helpfulCtrl54(3);
                    return;
                };$scope.question54_4 = function (){
                    helpfulCtrl54(4);
                    return;
                };$scope.question54_5 = function (){
                    helpfulCtrl54(5);
                    return;
                };$scope.question54_6 = function (){
                    helpfulCtrl54(6);
                    return;
                };$scope.question54_7 = function (){
                    helpfulCtrl54(7);
                    return;
                };

                var helpfulCtrl55 = function(n) {
                    var s = "question55";
                    valCtrl(s,n);
                    return;
                }

                $scope.question55_1 = function (){
                    helpfulCtrl55(1);
                    return;
                };$scope.question55_2 = function (){
                    helpfulCtrl55(2);
                    return;
                };$scope.question55_3 = function (){
                    helpfulCtrl55(3);
                    return;
                };$scope.question55_4 = function (){
                    helpfulCtrl55(4);
                    return;
                };$scope.question55_5 = function (){
                    helpfulCtrl55(5);
                    return;
                };$scope.question55_6 = function (){
                    helpfulCtrl55(6);
                    return;
                };$scope.question55_7 = function (){
                    helpfulCtrl55(7);
                    return;
                };


                var helpfulCtrl56 = function(n) {
                    var s = "question56";
                    valCtrl(s,n);
                    return;
                }

                $scope.question56_1 = function (){
                    helpfulCtrl56(1);
                    return;
                };$scope.question56_2 = function (){
                    helpfulCtrl56(2);
                    return;
                };$scope.question56_3 = function (){
                    helpfulCtrl56(3);
                    return;
                };$scope.question56_4 = function (){
                    helpfulCtrl56(4);
                    return;
                };$scope.question56_5 = function (){
                    helpfulCtrl56(5);
                    return;
                };$scope.question56_6 = function (){
                    helpfulCtrl56(6);
                    return;
                };$scope.question56_7 = function (){
                    helpfulCtrl56(7);
                    return;
                };

                var helpfulCtrl57 = function(n) {
                    var s = "question57";
                    valCtrl(s,n);
                    return;
                }

                $scope.question57_1 = function (){
                    helpfulCtrl57(1);
                    return;
                };$scope.question57_2 = function (){
                    helpfulCtrl57(2);
                    return;
                };$scope.question57_3 = function (){
                    helpfulCtrl57(3);
                    return;
                };$scope.question57_4 = function (){
                    helpfulCtrl57(4);
                    return;
                };$scope.question57_5 = function (){
                    helpfulCtrl57(5);
                    return;
                };$scope.question57_6 = function (){
                    helpfulCtrl57(6);
                    return;
                };$scope.question57_7 = function (){
                    helpfulCtrl57(7);
                    return;
                };

                var helpfulCtrl58 = function(n) {
                    var s = "question58";
                    valCtrl(s,n);
                    return;
                }

                $scope.question58_1 = function (){
                    helpfulCtrl58(1);
                    return;
                };$scope.question58_2 = function (){
                    helpfulCtrl58(2);
                    return;
                };$scope.question58_3 = function (){
                    helpfulCtrl58(3);
                    return;
                };$scope.question58_4 = function (){
                    helpfulCtrl58(4);
                    return;
                };$scope.question58_5 = function (){
                    helpfulCtrl58(5);
                    return;
                };$scope.question58_6 = function (){
                    helpfulCtrl58(6);
                    return;
                };$scope.question58_7 = function (){
                    helpfulCtrl58(7);
                    return;
                };

                var helpfulCtrl59 = function(n) {
                    var s = "question59";
                    valCtrl(s,n);
                    return;
                }

                $scope.question59_1 = function (){
                    helpfulCtrl59(1);
                    return;
                };$scope.question59_2 = function (){
                    helpfulCtrl59(2);
                    return;
                };$scope.question59_3 = function (){
                    helpfulCtrl59(3);
                    return;
                };$scope.question59_4 = function (){
                    helpfulCtrl59(4);
                    return;
                };$scope.question59_5 = function (){
                    helpfulCtrl59(5);
                    return;
                };$scope.question59_6 = function (){
                    helpfulCtrl59(6);
                    return;
                };$scope.question59_7 = function (){
                    helpfulCtrl59(7);
                    return;
                };

                var helpfulCtrl60 = function(n) {
                    var s = "question60";
                    valCtrl(s,n);
                    return;
                }

                $scope.question60_1 = function (){
                    helpfulCtrl60(1);
                    return;
                };$scope.question60_2 = function (){
                    helpfulCtrl60(2);
                    return;
                };$scope.question60_3 = function (){
                    helpfulCtrl60(3);
                    return;
                };$scope.question60_4 = function (){
                    helpfulCtrl60(4);
                    return;
                };$scope.question60_5 = function (){
                    helpfulCtrl60(5);
                    return;
                };$scope.question60_6 = function (){
                    helpfulCtrl60(6);
                    return;
                };$scope.question60_7 = function (){
                    helpfulCtrl60(7);
                    return;
                };

                var helpfulCtrl61 = function(n) {
                    var s = "question61";
                    valCtrl(s,n);
                    return;
                }

                $scope.question61_1 = function (){
                    helpfulCtrl61(1);
                    return;
                };$scope.question61_2 = function (){
                    helpfulCtrl61(2);
                    return;
                };$scope.question61_3 = function (){
                    helpfulCtrl61(3);
                    return;
                };$scope.question61_4 = function (){
                    helpfulCtrl61(4);
                    return;
                };$scope.question61_5 = function (){
                    helpfulCtrl61(5);
                    return;
                };$scope.question61_6 = function (){
                    helpfulCtrl61(6);
                    return;
                };$scope.question61_7 = function (){
                    helpfulCtrl61(7);
                    return;
                };

                var helpfulCtrl62 = function(n) {
                    var s = "question62";
                    valCtrl(s,n);
                    return;
                }

                $scope.question62_1 = function (){
                    helpfulCtrl62(1);
                    return;
                };$scope.question62_2 = function (){
                    helpfulCtrl62(2);
                    return;
                };$scope.question62_3 = function (){
                    helpfulCtrl62(3);
                    return;
                };$scope.question62_4 = function (){
                    helpfulCtrl62(4);
                    return;
                };$scope.question62_5 = function (){
                    helpfulCtrl62(5);
                    return;
                };$scope.question62_6 = function (){
                    helpfulCtrl62(6);
                    return;
                };$scope.question62_7 = function (){
                    helpfulCtrl62(7);
                    return;
                };

                var helpfulCtrl63 = function(n) {
                    var s = "question63";
                    valCtrl(s,n);
                    return;
                }

                $scope.question63_1 = function (){
                    helpfulCtrl63(1);
                    return;
                };$scope.question63_2 = function (){
                    helpfulCtrl63(2);
                    return;
                };$scope.question63_3 = function (){
                    helpfulCtrl63(3);
                    return;
                };$scope.question63_4 = function (){
                    helpfulCtrl63(4);
                    return;
                };$scope.question63_5 = function (){
                    helpfulCtrl63(5);
                    return;
                };$scope.question63_6 = function (){
                    helpfulCtrl63(6);
                    return;
                };$scope.question63_7 = function (){
                    helpfulCtrl63(7);
                    return;
                };

                var helpfulCtrl64 = function(n) {
                    var s = "question64";
                    valCtrl(s,n);
                    return;
                }

                $scope.question64_1 = function (){
                    helpfulCtrl64(1);
                    return;
                };$scope.question64_2 = function (){
                    helpfulCtrl64(2);
                    return;
                };$scope.question64_3 = function (){
                    helpfulCtrl64(3);
                    return;
                };$scope.question64_4 = function (){
                    helpfulCtrl64(4);
                    return;
                };$scope.question64_5 = function (){
                    helpfulCtrl64(5);
                    return;
                };$scope.question64_6 = function (){
                    helpfulCtrl64(6);
                    return;
                };$scope.question64_7 = function (){
                    helpfulCtrl64(7);
                    return;
                };


                var helpfulCtrl65 = function(n) {
                    var s = "question65";
                    valCtrl(s,n);
                    return;
                }

                $scope.question65_1 = function (){
                    helpfulCtrl65(1);
                    return;
                };$scope.question65_2 = function (){
                    helpfulCtrl65(2);
                    return;
                };$scope.question65_3 = function (){
                    helpfulCtrl65(3);
                    return;
                };$scope.question65_4 = function (){
                    helpfulCtrl65(4);
                    return;
                };$scope.question65_5 = function (){
                    helpfulCtrl65(5);
                    return;
                };$scope.question65_6 = function (){
                    helpfulCtrl65(6);
                    return;
                };$scope.question65_7 = function (){
                    helpfulCtrl65(7);
                    return;
                };

                // siqi - 66-94
                var helpfulCtrl66 = function(n) {
                    var s = "question66";
                    valCtrl(s,n);
                    return;
                }
                $scope.question66_1 = function (){
                    helpfulCtrl66(1);
                    return;
                }; $scope.question66_2 = function (){
                    helpfulCtrl66(2);
                    return;
                }; $scope.question66_3 = function (){
                    helpfulCtrl66(3);
                    return;
                }; $scope.question66_4 = function (){
                    helpfulCtrl66(4);
                    return;
                }; $scope.question66_5 = function (){
                    helpfulCtrl66(5);
                    return;
                }; $scope.question66_6 = function (){
                    helpfulCtrl66(6);
                    return;
                }; $scope.question66_7 = function (){
                    helpfulCtrl66(7);
                    return;
                };

                var helpfulCtrl67 = function(n) {
                    var s = "question67";
                    valCtrl(s,n);
                    return;
                }
                $scope.question67_1 = function (){
                    helpfulCtrl67(1);
                    return;
                }; $scope.question67_2 = function (){
                    helpfulCtrl67(2);
                    return;
                }; $scope.question67_3 = function (){
                    helpfulCtrl67(3);
                    return;
                }; $scope.question67_4 = function (){
                    helpfulCtrl67(4);
                    return;
                }; $scope.question67_5 = function (){
                    helpfulCtrl67(5);
                    return;
                }; $scope.question67_6 = function (){
                    helpfulCtrl67(6);
                    return;
                }; $scope.question67_7 = function (){
                    helpfulCtrl67(7);
                    return;
                };

                var helpfulCtrl68 = function(n) {
                    var s = "question68";
                    valCtrl(s,n);
                    return;
                }
                $scope.question68_1 = function (){
                    helpfulCtrl68(1);
                    return;
                }; $scope.question68_2 = function (){
                    helpfulCtrl68(2);
                    return;
                }; $scope.question68_3 = function (){
                    helpfulCtrl68(3);
                    return;
                }; $scope.question68_4 = function (){
                    helpfulCtrl68(4);
                    return;
                }; $scope.question68_5 = function (){
                    helpfulCtrl68(5);
                    return;
                }; $scope.question68_6 = function (){
                    helpfulCtrl68(6);
                    return;
                }; $scope.question68_7 = function (){
                    helpfulCtrl68(7);
                    return;
                };


                var helpfulCtrl69 = function(n) {
                    var s = "question69";
                    valCtrl(s,n);
                    return;
                }
                $scope.question69_1 = function (){
                    helpfulCtrl69(1);
                    return;
                }; $scope.question69_2 = function (){
                    helpfulCtrl69(2);
                    return;
                }; $scope.question69_3 = function (){
                    helpfulCtrl69(3);
                    return;
                }; $scope.question69_4 = function (){
                    helpfulCtrl69(4);
                    return;
                }; $scope.question69_5 = function (){
                    helpfulCtrl69(5);
                    return;
                }; $scope.question69_6 = function (){
                    helpfulCtrl69(6);
                    return;
                }; $scope.question69_7 = function (){
                    helpfulCtrl69(7);
                    return;
                };


                var helpfulCtrl70 = function(n) {
                    var s = "question70";
                    valCtrl(s,n);
                    return;
                }
                $scope.question70_1 = function (){
                    helpfulCtrl70(1);
                    return;
                }; $scope.question70_2 = function (){
                    helpfulCtrl70(2);
                    return;
                }; $scope.question70_3 = function (){
                    helpfulCtrl70(3);
                    return;
                }; $scope.question70_4 = function (){
                    helpfulCtrl70(4);
                    return;
                }; $scope.question70_5 = function (){
                    helpfulCtrl70(5);
                    return;
                }; $scope.question70_6 = function (){
                    helpfulCtrl70(6);
                    return;
                }; $scope.question70_7 = function (){
                    helpfulCtrl70(7);
                    return;
                };


                var helpfulCtrl71 = function(n) {
                    var s = "question71";
                    valCtrl(s,n);
                    return;
                }
                $scope.question71_1 = function (){
                    helpfulCtrl71(1);
                    return;
                }; $scope.question71_2 = function (){
                    helpfulCtrl71(2);
                    return;
                }; $scope.question71_3 = function (){
                    helpfulCtrl71(3);
                    return;
                }; $scope.question71_4 = function (){
                    helpfulCtrl71(4);
                    return;
                }; $scope.question71_5 = function (){
                    helpfulCtrl71(5);
                    return;
                }; $scope.question71_6 = function (){
                    helpfulCtrl71(6);
                    return;
                }; $scope.question71_7 = function (){
                    helpfulCtrl71(7);
                    return;
                };


                var helpfulCtrl72 = function(n) {
                    var s = "question72";
                    valCtrl(s,n);
                    return;
                }
                $scope.question72_1 = function (){
                    helpfulCtrl72(1);
                    return;
                }; $scope.question72_2 = function (){
                    helpfulCtrl72(2);
                    return;
                }; $scope.question72_3 = function (){
                    helpfulCtrl72(3);
                    return;
                }; $scope.question72_4 = function (){
                    helpfulCtrl72(4);
                    return;
                }; $scope.question72_5 = function (){
                    helpfulCtrl72(5);
                    return;
                }; $scope.question72_6 = function (){
                    helpfulCtrl72(6);
                    return;
                }; $scope.question72_7 = function (){
                    helpfulCtrl72(7);
                    return;
                };


                var helpfulCtrl73 = function(n) {
                    var s = "question73";
                    valCtrl(s,n);
                    return;
                }
                $scope.question73_1 = function (){
                    helpfulCtrl73(1);
                    return;
                }; $scope.question73_2 = function (){
                    helpfulCtrl73(2);
                    return;
                }; $scope.question73_3 = function (){
                    helpfulCtrl73(3);
                    return;
                }; $scope.question73_4 = function (){
                    helpfulCtrl73(4);
                    return;
                }; $scope.question73_5 = function (){
                    helpfulCtrl73(5);
                    return;
                }; $scope.question73_6 = function (){
                    helpfulCtrl73(6);
                    return;
                }; $scope.question73_7 = function (){
                    helpfulCtrl73(7);
                    return;
                };


                var helpfulCtrl74 = function(n) {
                    var s = "question74";
                    valCtrl(s,n);
                    return;
                }
                $scope.question74_1 = function (){
                    helpfulCtrl74(1);
                    return;
                }; $scope.question74_2 = function (){
                    helpfulCtrl74(2);
                    return;
                }; $scope.question74_3 = function (){
                    helpfulCtrl74(3);
                    return;
                }; $scope.question74_4 = function (){
                    helpfulCtrl74(4);
                    return;
                }; $scope.question74_5 = function (){
                    helpfulCtrl74(5);
                    return;
                }; $scope.question74_6 = function (){
                    helpfulCtrl74(6);
                    return;
                }; $scope.question74_7 = function (){
                    helpfulCtrl74(7);
                    return;
                };


                var helpfulCtrl75 = function(n) {
                    var s = "question75";
                    valCtrl(s,n);
                    return;
                }
                $scope.question75_1 = function (){
                    helpfulCtrl75(1);
                    return;
                }; $scope.question75_2 = function (){
                    helpfulCtrl75(2);
                    return;
                }; $scope.question75_3 = function (){
                    helpfulCtrl75(3);
                    return;
                }; $scope.question75_4 = function (){
                    helpfulCtrl75(4);
                    return;
                }; $scope.question75_5 = function (){
                    helpfulCtrl75(5);
                    return;
                }; $scope.question75_6 = function (){
                    helpfulCtrl75(6);
                    return;
                }; $scope.question75_7 = function (){
                    helpfulCtrl75(7);
                    return;
                };


                var helpfulCtrl76 = function(n) {
                    var s = "question76";
                    valCtrl(s,n);
                    return;
                }
                $scope.question76_1 = function (){
                    helpfulCtrl76(1);
                    return;
                }; $scope.question76_2 = function (){
                    helpfulCtrl76(2);
                    return;
                }; $scope.question76_3 = function (){
                    helpfulCtrl76(3);
                    return;
                }; $scope.question76_4 = function (){
                    helpfulCtrl76(4);
                    return;
                }; $scope.question76_5 = function (){
                    helpfulCtrl76(5);
                    return;
                }; $scope.question76_6 = function (){
                    helpfulCtrl76(6);
                    return;
                }; $scope.question76_7 = function (){
                    helpfulCtrl76(7);
                    return;
                };


                var helpfulCtrl77 = function(n) {
                    var s = "question77";
                    valCtrl(s,n);
                    return;
                }
                $scope.question77_1 = function (){
                    helpfulCtrl77(1);
                    return;
                }; $scope.question77_2 = function (){
                    helpfulCtrl77(2);
                    return;
                }; $scope.question77_3 = function (){
                    helpfulCtrl77(3);
                    return;
                }; $scope.question77_4 = function (){
                    helpfulCtrl77(4);
                    return;
                }; $scope.question77_5 = function (){
                    helpfulCtrl77(5);
                    return;
                }; $scope.question77_6 = function (){
                    helpfulCtrl77(6);
                    return;
                }; $scope.question77_7 = function (){
                    helpfulCtrl77(7);
                    return;
                };


                var helpfulCtrl78 = function(n) {
                    var s = "question78";
                    valCtrl(s,n);
                    return;
                }
                $scope.question78_1 = function (){
                    helpfulCtrl78(1);
                    return;
                }; $scope.question78_2 = function (){
                    helpfulCtrl78(2);
                    return;
                }; $scope.question78_3 = function (){
                    helpfulCtrl78(3);
                    return;
                }; $scope.question78_4 = function (){
                    helpfulCtrl78(4);
                    return;
                }; $scope.question78_5 = function (){
                    helpfulCtrl78(5);
                    return;
                }; $scope.question78_6 = function (){
                    helpfulCtrl78(6);
                    return;
                }; $scope.question78_7 = function (){
                    helpfulCtrl78(7);
                    return;
                };
                var helpfulCtrl79 = function(n) {
                    var s = "question79";
                    valCtrl(s,n);
                    return;
                }
                $scope.question79_1 = function (){
                    helpfulCtrl79(1);
                    return;
                }; $scope.question79_2 = function (){
                    helpfulCtrl79(2);
                    return;
                }; $scope.question79_3 = function (){
                    helpfulCtrl79(3);
                    return;
                }; $scope.question79_4 = function (){
                    helpfulCtrl79(4);
                    return;
                }; $scope.question79_5 = function (){
                    helpfulCtrl79(5);
                    return;
                }; $scope.question79_6 = function (){
                    helpfulCtrl79(6);
                    return;
                }; $scope.question79_7 = function (){
                    helpfulCtrl79(7);
                    return;
                };
                var helpfulCtrl80 = function(n) {
                    var s = "question80";
                    valCtrl(s,n);
                    return;
                }
                $scope.question80_1 = function (){
                    helpfulCtrl80(1);
                    return;
                }; $scope.question80_2 = function (){
                    helpfulCtrl80(2);
                    return;
                }; $scope.question80_3 = function (){
                    helpfulCtrl80(3);
                    return;
                }; $scope.question80_4 = function (){
                    helpfulCtrl80(4);
                    return;
                }; $scope.question80_5 = function (){
                    helpfulCtrl80(5);
                    return;
                }; $scope.question80_6 = function (){
                    helpfulCtrl80(6);
                    return;
                }; $scope.question80_7 = function (){
                    helpfulCtrl80(7);
                    return;
                };
                var helpfulCtrl81 = function(n) {
                    var s = "question81";
                    valCtrl(s,n);
                    return;
                }
                $scope.question81_1 = function (){
                    helpfulCtrl81(1);
                    return;
                }; $scope.question81_2 = function (){
                    helpfulCtrl81(2);
                    return;
                }; $scope.question81_3 = function (){
                    helpfulCtrl81(3);
                    return;
                }; $scope.question81_4 = function (){
                    helpfulCtrl81(4);
                    return;
                }; $scope.question81_5 = function (){
                    helpfulCtrl81(5);
                    return;
                }; $scope.question81_6 = function (){
                    helpfulCtrl81(6);
                    return;
                }; $scope.question81_7 = function (){
                    helpfulCtrl81(7);
                    return;
                };
                var helpfulCtrl82 = function(n) {
                    var s = "question82";
                    valCtrl(s,n);
                    return;
                }
                $scope.question82_1 = function (){
                    helpfulCtrl82(1);
                    return;
                }; $scope.question82_2 = function (){
                    helpfulCtrl82(2);
                    return;
                }; $scope.question82_3 = function (){
                    helpfulCtrl82(3);
                    return;
                }; $scope.question82_4 = function (){
                    helpfulCtrl82(4);
                    return;
                }; $scope.question82_5 = function (){
                    helpfulCtrl82(5);
                    return;
                }; $scope.question82_6 = function (){
                    helpfulCtrl82(6);
                    return;
                }; $scope.question82_7 = function (){
                    helpfulCtrl82(7);
                    return;
                };
                var helpfulCtrl83 = function(n) {
                    var s = "question83";
                    valCtrl(s,n);
                    return;
                }
                $scope.question83_1 = function (){
                    helpfulCtrl83(1);
                    return;
                }; $scope.question83_2 = function (){
                    helpfulCtrl83(2);
                    return;
                }; $scope.question83_3 = function (){
                    helpfulCtrl83(3);
                    return;
                }; $scope.question83_4 = function (){
                    helpfulCtrl83(4);
                    return;
                }; $scope.question83_5 = function (){
                    helpfulCtrl83(5);
                    return;
                }; $scope.question83_6 = function (){
                    helpfulCtrl83(6);
                    return;
                }; $scope.question83_7 = function (){
                    helpfulCtrl83(7);
                    return;
                };
                var helpfulCtrl84 = function(n) {
                    var s = "question84";
                    valCtrl(s,n);
                    return;
                }
                $scope.question84_1 = function (){
                    helpfulCtrl84(1);
                    return;
                }; $scope.question84_2 = function (){
                    helpfulCtrl84(2);
                    return;
                }; $scope.question84_3 = function (){
                    helpfulCtrl84(3);
                    return;
                }; $scope.question84_4 = function (){
                    helpfulCtrl84(4);
                    return;
                }; $scope.question84_5 = function (){
                    helpfulCtrl84(5);
                    return;
                }; $scope.question84_6 = function (){
                    helpfulCtrl84(6);
                    return;
                }; $scope.question84_7 = function (){
                    helpfulCtrl84(7);
                    return;
                };
                var helpfulCtrl85 = function(n) {
                    var s = "question85";
                    valCtrl(s,n);
                    return;
                }
                $scope.question85_1 = function (){
                    helpfulCtrl85(1);
                    return;
                }; $scope.question85_2 = function (){
                    helpfulCtrl85(2);
                    return;
                }; $scope.question85_3 = function (){
                    helpfulCtrl85(3);
                    return;
                }; $scope.question85_4 = function (){
                    helpfulCtrl85(4);
                    return;
                }; $scope.question85_5 = function (){
                    helpfulCtrl67(5);
                    return;
                }; $scope.question85_6 = function (){
                    helpfulCtrl85(6);
                    return;
                }; $scope.question85_7 = function (){
                    helpfulCtrl85(7);
                    return;
                };
                var helpfulCtrl86 = function(n) {
                    var s = "question86";
                    valCtrl(s,n);
                    return;
                }
                $scope.question86_1 = function (){
                    helpfulCtrl86(1);
                    return;
                }; $scope.question86_2 = function (){
                    helpfulCtrl86(2);
                    return;
                }; $scope.question86_3 = function (){
                    helpfulCtrl86(3);
                    return;
                }; $scope.question86_4 = function (){
                    helpfulCtrl86(4);
                    return;
                }; $scope.question86_5 = function (){
                    helpfulCtrl86(5);
                    return;
                }; $scope.question86_6 = function (){
                    helpfulCtrl86(6);
                    return;
                }; $scope.question86_7 = function (){
                    helpfulCtrl86(7);
                    return;
                };
                var helpfulCtrl87 = function(n) {
                    var s = "question87";
                    valCtrl(s,n);
                    return;
                }
                $scope.question87_1 = function (){
                    helpfulCtrl87(1);
                    return;
                }; $scope.question87_2 = function (){
                    helpfulCtrl87(2);
                    return;
                }; $scope.question87_3 = function (){
                    helpfulCtrl87(3);
                    return;
                }; $scope.question87_4 = function (){
                    helpfulCtrl87(4);
                    return;
                }; $scope.question87_5 = function (){
                    helpfulCtrl87(5);
                    return;
                }; $scope.question87_6 = function (){
                    helpfulCtrl87(6);
                    return;
                }; $scope.question87_7 = function (){
                    helpfulCtrl87(7);
                    return;
                };
                var helpfulCtrl88 = function(n) {
                    var s = "question88";
                    valCtrl(s,n);
                    return;
                }
                $scope.question88_1 = function (){
                    helpfulCtrl88(1);
                    return;
                }; $scope.question88_2 = function (){
                    helpfulCtrl88(2);
                    return;
                }; $scope.question88_3 = function (){
                    helpfulCtrl88(3);
                    return;
                }; $scope.question88_4 = function (){
                    helpfulCtrl88(4);
                    return;
                }; $scope.question88_5 = function (){
                    helpfulCtrl88(5);
                    return;
                }; $scope.question88_6 = function (){
                    helpfulCtrl88(6);
                    return;
                }; $scope.question88_7 = function (){
                    helpfulCtrl88(7);
                    return;
                };
                var helpfulCtrl89 = function(n) {
                    var s = "question89";
                    valCtrl(s,n);
                    return;
                }
                $scope.question89_1 = function (){
                    helpfulCtrl89(1);
                    return;
                }; $scope.question89_2 = function (){
                    helpfulCtrl89(2);
                    return;
                }; $scope.question89_3 = function (){
                    helpfulCtrl89(3);
                    return;
                }; $scope.question89_4 = function (){
                    helpfulCtrl89(4);
                    return;
                }; $scope.question89_5 = function (){
                    helpfulCtrl89(5);
                    return;
                }; $scope.question89_6 = function (){
                    helpfulCtrl89(6);
                    return;
                }; $scope.question89_7 = function (){
                    helpfulCtrl89(7);
                    return;
                };
                var helpfulCtrl90 = function(n) {
                    var s = "question90";
                    valCtrl(s,n);
                    return;
                }
                $scope.question90_1 = function (){
                    helpfulCtrl90(1);
                    return;
                }; $scope.question90_2 = function (){
                    helpfulCtrl90(2);
                    return;
                }; $scope.question90_3 = function (){
                    helpfulCtrl90(3);
                    return;
                }; $scope.question90_4 = function (){
                    helpfulCtrl90(4);
                    return;
                }; $scope.question90_5 = function (){
                    helpfulCtrl90(5);
                    return;
                }; $scope.question90_6 = function (){
                    helpfulCtrl90(6);
                    return;
                }; $scope.question90_7 = function (){
                    helpfulCtrl90(7);
                    return;
                };
                var helpfulCtrl91 = function(n) {
                    var s = "question91";
                    valCtrl(s,n);
                    return;
                }
                $scope.question91_1 = function (){
                    helpfulCtrl91(1);
                    return;
                }; $scope.question91_2 = function (){
                    helpfulCtrl91(2);
                    return;
                }; $scope.question91_3 = function (){
                    helpfulCtrl91(3);
                    return;
                }; $scope.question91_4 = function (){
                    helpfulCtrl91(4);
                    return;
                }; $scope.question91_5 = function (){
                    helpfulCtrl91(5);
                    return;
                }; $scope.question91_6 = function (){
                    helpfulCtrl91(6);
                    return;
                }; $scope.question91_7 = function (){
                    helpfulCtrl91(7);
                    return;
                };
                var helpfulCtrl92 = function(n) {
                    var s = "question92";
                    valCtrl(s,n);
                    return;
                }
                $scope.question92_1 = function (){
                    helpfulCtrl92(1);
                    return;
                }; $scope.question92_2 = function (){
                    helpfulCtrl92(2);
                    return;
                }; $scope.question92_3 = function (){
                    helpfulCtrl92(3);
                    return;
                }; $scope.question92_4 = function (){
                    helpfulCtrl92(4);
                    return;
                }; $scope.question92_5 = function (){
                    helpfulCtrl92(5);
                    return;
                }; $scope.question92_6 = function (){
                    helpfulCtrl92(6);
                    return;
                }; $scope.question92_7 = function (){
                    helpfulCtrl92(7);
                    return;
                };
                var helpfulCtrl93 = function(n) {
                    var s = "question93";
                    valCtrl(s,n);
                    return;
                }
                $scope.question93_1 = function (){
                    helpfulCtrl93(1);
                    return;
                }; $scope.question93_2 = function (){
                    helpfulCtrl93(2);
                    return;
                }; $scope.question93_3 = function (){
                    helpfulCtrl93(3);
                    return;
                }; $scope.question93_4 = function (){
                    helpfulCtrl93(4);
                    return;
                }; $scope.question93_5 = function (){
                    helpfulCtrl93(5);
                    return;
                }; $scope.question93_6 = function (){
                    helpfulCtrl93(6);
                    return;
                }; $scope.question93_7 = function (){
                    helpfulCtrl93(7);
                    return;
                };
                var helpfulCtrl94 = function(n) {
                    var s = "question94";
                    valCtrl(s,n);
                    return;
                }
                $scope.question94_1 = function (){
                    helpfulCtrl94(1);
                    return;
                }; $scope.question94_2 = function (){
                    helpfulCtrl94(2);
                    return;
                }; $scope.question94_3 = function (){
                    helpfulCtrl94(3);
                    return;
                }; $scope.question94_4 = function (){
                    helpfulCtrl94(4);
                    return;
                }; $scope.question94_5 = function (){
                    helpfulCtrl94(5);
                    return;
                }; $scope.question94_6 = function (){
                    helpfulCtrl94(6);
                    return;
                }; $scope.question94_7 = function (){
                    helpfulCtrl94(7);
                    return;
                };


                finishedQuiz_init();
                day3_init();
            }]
    );

