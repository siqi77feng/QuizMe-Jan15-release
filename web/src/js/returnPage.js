
/* returnPage.js */
/* Authors: John Richards */
/* This will run the return of users */
 
angular.module('quizMeApp')
.controller('ReturnCtrl',
    ['$scope', 'myService',
    function ReturnCtrl($scope, myService, ) {
        'use strict';
        $scope.meta = {
            title: "Return Page"
        };
        //Globals

        var returnID;
        var response;
        var subject;
        var validReturnID;

        // init called at end of file
        var returnPage_init = function () {
            document.getElementById("identikey-box").value = "";
            document.getElementById("identikey-box").readOnly = false;
            document.getElementById("identikey-box").focus();
            myService.identikey = "";
            myService.subject = "";
            validReturnID = false;
            returnID = "";
            ga('set', 'page', '/returnPage');
            ga('send', 'pageview');
            console.log("Google Analytics pageview sent: /returnPage");
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

        // Sends data for one user to the backend
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
                        myService.firstName = value.firstName;
                        myService.lastName = value.lastName;
                        myService.n = value.n;
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

            console.log(ret);
            console.log("Returning from sendReturnData");
            return ret.status === 200;
        };

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
        $scope.RestartQuiz = function () {
            requestCh(myService.subject, myService.subject + " Quiz", myService.identiKey);
            return;
        }
        var returnKeyValidationCallback = function (validID) {
            if (validID) {
                document.getElementById('identikey-box').disabled = true;
                $scope.$apply(); // Force Angular to update
                // If all is good start the quiz with the users subject
                if (myService.subject != "") {
                    if (myService.subject == "Sports&Gaming") {
                        myService.subject = "Sport and Gaming Final";
                    } else if (myService.subject == "Animal&Biology") {
                        myService.subject = "Animal and Biology Final";
                    }
                    else if (myService.subject == "Food&Drink") {
                        myService.subject = "Food and Drink Final";
                    }
                    else if (myService.subject == "WorldHistory") {
                        myService.subject = "World History Final";
                    }
                    else if (myService.subject == "Anatomy&Medicine") {
                        myService.subject = "Anatomy and Medicine Final";
                    }
                    validReturnID = true;
                    $scope.$apply()
                }
                else {
                    console.log("Subject Empty");
                }
                //requestCh(myService.subject, myService.subject + " Trivia", myService.identikey);
            } else {
                alert('Please use a valid Return Key.');
                clearIdentikey();
            };
            return;
        };
        returnPage_init();
    }]
);
