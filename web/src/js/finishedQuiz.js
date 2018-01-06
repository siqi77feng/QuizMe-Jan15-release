// finishedQuiz.js
(function(){
    angular.module('quizMeApp')
        .controller('FinishedQuizCtrl',
            ['$scope','$location','myService',
                function FinishedQuizCtrl( $scope, $location, myService ) {
                    'use strict';
                    $scope.meta = {
                        title: "Finished Quiz Page"
                    };
                    $(".LastPage").hide();
                    $(".submitSurvey").click(function () {
                        $(".fq").hide();
                        $(".chart").hide();
                        $("#1").hide();
                        $("#2").hide();
                        $(".LastPage").show();

                    });
                    var helpfulVal, appropriateVal, easyVal;
                    var surveyTaken;
                    var m = Math.floor(Math.random()*2)
                    //console.log(n);
                    console.log(m);
                    if(m==1) {
                        if(myService.n ==0) {
                            $(".fq").hide();
                            $("#1").hide();
                            $("#2").show();
                            var chart = AmCharts.makeChart("chartdiv",
                                {
                                    "type": "serial",
                                    "theme": "light",
                                    "dataProvider": [{
                                        "name": "Practice Tested",
                                        "points": myService.APercent * 100,
                                        "color": "#7F8DA9",
                                        "bullet": ""
                                    }, {
                                        "name": "Restudied",
                                        "points": myService.BPercent * 100,
                                        "color": "#FEC514",
                                        "bullet": ""
                                    }],
                                    "valueAxes": [{
                                        "maximum": 100,
                                        "minimum": 0,
                                        "axisAlpha": 0,
                                        "dashLength": 4,
                                        "position": "left"
                                    }],
                                    "startDuration": 1,
                                    "graphs": [{
                                        "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                                        "bulletOffset": 10,
                                        "bulletSize": 52,
                                        "colorField": "color",
                                        "cornerRadiusTop": 8,
                                        "customBulletField": "bullet",
                                        "fillAlphas": 0.8,
                                        "lineAlpha": 0,
                                        "type": "column",
                                        "valueField": "points"
                                    }],
                                    "marginTop": 0,
                                    "marginRight": 0,
                                    "marginLeft": 0,
                                    "marginBottom": 0,
                                    "autoMargins": false,
                                    "categoryField": "name",
                                    "categoryAxis": {
                                        "axisAlpha": 0,
                                        "gridAlpha": 0,
                                        "inside": true,
                                        "tickLength": 0
                                    },
                                    "export": {
                                        "enabled": true
                                    }
                                });
                        }
                        else if(myService.n==1)
                        {
                            $(".fq").hide();
                            $("#1").hide();
                            $("#2").show();
                            var chart = AmCharts.makeChart("chartdiv",
                                {
                                    "type": "serial",
                                    "theme": "light",
                                    "dataProvider": [{
                                        "name": "Practice Tested",
                                        "points": myService.BPercent * 100,
                                        "color": "#7F8DA9",
                                        "bullet": ""
                                    }, {
                                        "name": "Restudied",
                                        "points": myService.APercent * 100,
                                        "color": "#FEC514",
                                        "bullet": ""
                                    }],
                                    "valueAxes": [{
                                        "maximum": 100,
                                        "minimum": 0,
                                        "axisAlpha": 0,
                                        "dashLength": 4,
                                        "position": "left"
                                    }],
                                    "startDuration": 1,
                                    "graphs": [{
                                        "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                                        "bulletOffset": 10,
                                        "bulletSize": 52,
                                        "colorField": "color",
                                        "cornerRadiusTop": 8,
                                        "customBulletField": "bullet",
                                        "fillAlphas": 0.8,
                                        "lineAlpha": 0,
                                        "type": "column",
                                        "valueField": "points"
                                    }],
                                    "marginTop": 0,
                                    "marginRight": 0,
                                    "marginLeft": 0,
                                    "marginBottom": 0,
                                    "autoMargins": false,
                                    "categoryField": "name",
                                    "categoryAxis": {
                                        "axisAlpha": 0,
                                        "gridAlpha": 0,
                                        "inside": true,
                                        "tickLength": 0
                                    },
                                    "export": {
                                        "enabled": true
                                    }
                                });
                        }
                    }
                    else
                    {
                        $(".fq").hide();
                        $("#1").show();
                        $("#2").hide();
                        var chart = AmCharts.makeChart("chartdiv",
                            {
                                "type": "serial",
                                "theme": "light",
                                "dataProvider": [{
                                    "name": "Practice Tested",
                                    "points": 58,
                                    "color": "#7F8DA9",
                                    "bullet": ""
                                }, {
                                    "name": "Restudied",
                                    "points": 42,
                                    "color": "#FEC514",
                                    "bullet": ""
                                }],
                                "valueAxes": [{
                                    "maximum": 100,
                                    "minimum": 0,
                                    "axisAlpha": 0,
                                    "dashLength": 4,
                                    "position": "left"
                                }],
                                "startDuration": 1,
                                "graphs": [{
                                    "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                                    "bulletOffset": 10,
                                    "bulletSize": 52,
                                    "colorField": "color",
                                    "cornerRadiusTop": 8,
                                    "customBulletField": "bullet",
                                    "fillAlphas": 0.8,
                                    "lineAlpha": 0,
                                    "type": "column",
                                    "valueField": "points"
                                }],
                                "marginTop": 0,
                                "marginRight": 0,
                                "marginLeft": 0,
                                "marginBottom": 0,
                                "autoMargins": false,
                                "categoryField": "name",
                                "categoryAxis": {
                                    "axisAlpha": 0,
                                    "gridAlpha": 0,
                                    "inside": true,
                                    "tickLength": 0
                                },
                                "export": {
                                    "enabled": true
                                }
                            });
                    }
                    var finishedQuiz_init = function() {
                        // Pull quiz results data from service

                        $scope.Acredit = myService.APercent*100;

                        $scope.Bcredit = myService.BPercent*100;
                        $scope.number_correct4Return = myService.numCorrectReturn;


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
                        ga('set', 'page', '/finishedQuiz');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /finishedQuiz");

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

                    $scope.restartQuiz = function() {
                        //$location.url("#quiz/");
                        window.location.href = "#quiz/";
                    }

                    $scope.consume_feedback = function() {

                        // collect
                        // _Val collected locally
                        var docID = myService.docID;
                        //var helpfulComment = document.getElementById("helpful-comments").value;
                        var appropriateComment = document.getElementById("appropriate-comments").value;
                        var easyComment = document.getElementById("easy-comments").value;

                        // if blank... do nothing with the data
                        if ( appropriateComment === easyComment === "" && appropriateVal === helpfulVal === 0 ) {
                            return;
                        }

                        var feedback = {
                            "docID":	docID,
                            //"helpfulVal":	helpfulVal,
                            //"Your Name with Student ID":	helpfulComment,
                            //"appropriateVal":	appropriateVal,
                            "if ":	appropriateComment,
                            //"easyVal":	easyVal,
                            "then":	easyComment
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
                        // clearVal();
                        // document.getElementById("helpful-comments").value = "";
                        document.getElementById("appropriate-comments").value = "";
                        document.getElementById("easy-comments").value = "";

                        surveyTaken = true;

                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                        // Send pageview
                        ga('set', 'page', '/finishedQuiz-submit');
                        ga('send', 'pageview');
                        console.log("Google Analytics pageview sent: /finishedQuiz-submit");

                        return;
                    }/*
             var n =Math.floor(Math.random()*2);
            var m = myService.n;
            if (n = 0)
            {   if(m==0)
                {
                    var chart = AmCharts.makeChart("chartdiv",
                        {
                            "type": "serial",
                            "theme": "light",
                            "dataProvider": [{
                                "name": "Testing",
                                "points": myService.APercent * 100,
                                "color": "#7F8DA9",
                                "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
                            }, {
                                "name": "Damon",
                                "points": myService.BPercent * 100,
                                "color": "#FEC514",
                                "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
                            }],
                            "valueAxes": [{
                                "maximum": 100,
                                "minimum": 0,
                                "axisAlpha": 0,
                                "dashLength": 4,
                                "position": "left"
                            }],
                            "startDuration": 1,
                            "graphs": [{
                                "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                                "bulletOffset": 10,
                                "bulletSize": 52,
                                "colorField": "color",
                                "cornerRadiusTop": 8,
                                "customBulletField": "bullet",
                                "fillAlphas": 0.8,
                                "lineAlpha": 0,
                                "type": "column",
                                "valueField": "points"
                            }],
                            "marginTop": 0,
                            "marginRight": 0,
                            "marginLeft": 0,
                            "marginBottom": 0,
                            "autoMargins": false,
                            "categoryField": "name",
                            "categoryAxis": {
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "inside": true,
                                "tickLength": 0
                            },
                            "export": {
                                "enabled": true
                            }
                        });
                }
                else{
                var chart = AmCharts.makeChart("chartdiv",
                    {
                        "type": "serial",
                        "theme": "light",
                        "dataProvider": [{
                            "name": "Testing",
                            "points": myService.BPercent * 100,
                            "color": "#7F8DA9",
                            "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
                        }, {
                            "name": "Damon",
                            "points": myService.APercent * 100,
                            "color": "#FEC514",
                            "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
                        }],
                        "valueAxes": [{
                            "maximum": 100,
                            "minimum": 0,
                            "axisAlpha": 0,
                            "dashLength": 4,
                            "position": "left"
                        }],
                        "startDuration": 1,
                        "graphs": [{
                            "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                            "bulletOffset": 10,
                            "bulletSize": 52,
                            "colorField": "color",
                            "cornerRadiusTop": 8,
                            "customBulletField": "bullet",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0,
                            "type": "column",
                            "valueField": "points"
                        }],
                        "marginTop": 0,
                        "marginRight": 0,
                        "marginLeft": 0,
                        "marginBottom": 0,
                        "autoMargins": false,
                        "categoryField": "name",
                        "categoryAxis": {
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "inside": true,
                            "tickLength": 0
                        },
                        "export": {
                            "enabled": true
                        }
                    });

            }
            }
            if(n==1)
            {
                var chart = AmCharts.makeChart("chartdiv",
                    {
                        "type": "serial",
                        "theme": "light",
                        "dataProvider": [{
                            "name": "Testing",
                            "points": 58,
                            "color": "#7F8DA9",
                            "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
                        }, {
                            "name": "Restudy",
                            "points": 42,
                            "color": "#FEC514",
                            "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
                        }],
                        "valueAxes": [{
                            "maximum": 100,
                            "minimum": 0,
                            "axisAlpha": 0,
                            "dashLength": 4,
                            "position": "left"
                        }],
                        "startDuration": 1,
                        "graphs": [{
                            "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                            "bulletOffset": 10,
                            "bulletSize": 52,
                            "colorField": "color",
                            "cornerRadiusTop": 8,
                            "customBulletField": "bullet",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0,
                            "type": "column",
                            "valueField": "points"
                        }],
                        "marginTop": 0,
                        "marginRight": 0,
                        "marginLeft": 0,
                        "marginBottom": 0,
                        "autoMargins": false,
                        "categoryField": "name",
                        "categoryAxis": {
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "inside": true,
                            "tickLength": 0
                        },
                        "export": {
                            "enabled": true
                        }
                    });
            }
            */

                    finishedQuiz_init();
                }]
        );
})();

