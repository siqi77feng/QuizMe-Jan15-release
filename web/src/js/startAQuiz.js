(function(){            
    angular.module('quizMeApp')
    .controller('StartAQuizCtrl',
        ['$scope','myService',
        function StartAQuizCtrl( $scope, myService ) {
            'use strict';
            $scope.meta = {
                title: "Starting a quiz"
            };

            // globals
            var haveID;
            var identiKey;

            // init called at end of file
            var startAQuiz_init = function() {
                document.getElementById("identikey-box").value = "";
                document.getElementById("identikey-box").readOnly = false;
                document.getElementById("identikey-box").focus();
                haveID = false;
                myService.questionsGenerated = false;
                myService.questions = "";
                identiKey="";
                ga('set', 'page', '/startAQuiz');
                ga('send', 'pageview');
                console.log("Google Analytics pageview sent: /startAQuiz");
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
                    "identiKey": identiKey
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

            var clearIdentikey = function(){
                document.getElementById("identikey-box").value = "";
            };

            // Driver called on QuizMe click
            $scope.QuizMe = function() {
                myService.identiKey = document.getElementById("identikey-box").value;
                isValidID();
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
                    alert('Please use a valid IdentiKey username.');
                    clearIdentikey();
                };
                return;
            };

            $scope.haveID = function() {
                return haveID;
            };

            $scope.uploadText = function() {
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

                processing(true)
                var pastedText = document.getElementById("pasted-textarea").value;
                if (pastedText.length > 80000) {
                    processing(false)
                    alert("Please limit pasted text to 80,000 characters.");
                    return;
                }
                if (pastedText.trim() == "") {
                    processing(false)
                    console.log("No text detected - returning.")
                    return;
                }

                // Create JSON object to send
                var textData = {
                    "pastedText": pastedText
                };

                var ret = $.ajax({
                    async: true,
                    url: './uploadText',
                    type: 'POST',
                    data: textData,
                    success: function(data) {
                        console.log("FRONTEND textData: returned "+data);
                        myService.docName = "Pasted text";
                        myService.questions = data;
                        myService.questionsGenerated = true;
                        uploadTextCallback(true);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                        //replace the console.log with redirect to error page
                        console.error(errorThrown + ": " + XMLHttpRequest.responseText);
                        uploadTextCallback(false);
                    }
                });

                // processing(false)

                console.log(ret);
                console.log("Returning from uploadText");
                return ret.status===200;
                // Returns for now, but the POST request to the backend is
                // asynchronous, so it will call uploadTextCallback()
                // immediately below this when it returns.
            }
            var uploadTextCallback = function(quizGenerated) {
                if (quizGenerated) {
                    window.location.href = "#quiz";
                } else {
                    alert('QuizMe could not generate a quiz for that text. Please try again.');
                };
                return;
            };

            
            $scope.uploadADoc = function(){
                document.getElementById("upload-input").click();
            };

            // PSYC2145
            $scope.PSYC2145Ch1 = function() {
                requestCh("PSYC2145-ch-1","Chapter 1 : The Science of the Mind",identiKey);
                return;
            };
            $scope.PSYC2145Ch2 = function() {
                requestCh("PSYC2145-ch-2","Chapter 2 : The Neural Basis for Cognition",identiKey);
                return;
            };
            $scope.PSYC2145Ch3 = function() {
                requestCh("PSYC2145-ch-3","Chapter 3 : Visual Perception",identiKey);
                return;
            };
            $scope.PSYC2145Ch4 = function() {
                requestCh("PSYC2145-ch-4","Chapter 4 : Recognizing Objects",identiKey);
                return;
            };
            $scope.PSYC2145Ch5 = function() {
                requestCh("PSYC2145-ch-5","Chapter 5 : Paying Attention",identiKey);
                return;
            };
            $scope.PSYC2145Ch6 = function() {
                requestCh("PSYC2145-ch-6","Chapter 6 : The Acquisition of Memories and the Working...",identiKey);
                return;
            };
            $scope.PSYC2145Ch7 = function() {
                requestCh("PSYC2145-ch-7","Chapter 7 : Interconnection between Acquistion and Retrieval",identiKey);
                return;
            };
            $scope.PSYC2145Ch8 = function() {
                requestCh("PSYC2145-ch-8","Chapter 8 : Remembering Complex Events",identiKey);
                return;
            };
            $scope.PSYC2145Ch9 = function() {
                requestCh("PSYC2145-ch-9","Chapter 9 : Concepts and Generic Knowledge",identiKey);
                return;
            };
            $scope.PSYC2145Ch10 = function() {
                requestCh("PSYC2145-ch-10","Chapter 10 : Language",identiKey);
                return;
            };
            $scope.PSYC2145Ch11 = function() {
                requestCh("PSYC2145-ch-11","Chapter 11 : Visual Knowledge",identiKey);
                return;
            };
            $scope.PSYC2145Ch12 = function() {
                requestCh("PSYC2145-ch-12","Chapter 12 : Judgment and Reasoning",identiKey);
                return;
            };
            $scope.PSYC2145Ch13 = function() {
                requestCh("PSYC2145-ch-13","Chapter 13 : Problem Solving and Intelligence",identiKey);
                return;
            };
            $scope.PSYC2145Ch14 = function() {
                requestCh("PSYC2145-ch-14","Chapter 14 : Conscious Thought, Unconscious Thought",identiKey);
                return;
            };

            startAQuiz_init();
            
        }]
    );
})();