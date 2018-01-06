/* app.js */
/* Authors: Ryan Tabler */
/* Not to be confused with app.js 3 directories up.
 * This app.js is only called from index.html to define routes for the web server.
 * (This file is normally called app.js, so I wasn't sure what else to call it)
 */

angular.module('quizMeApp', [
    'ngRoute'
]).config(function($routeProvider) {
    'use strict';
    /* Routing for our web page */
    $routeProvider
    .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutCtrl'
    })
    .when('/quiz', {
        templateUrl: 'quiz.html',
        controller: 'QuizCtrl'
    })
    .when('/finishedQuiz', {
        templateUrl: 'finishedQuiz.html',
        controller: 'FinishedQuizCtrl'
    })
    .when('/surveyQuiz', {
        templateUrl: 'survey.html',
        controller: 'surveyCtrl'
    })
    .when('/startAQuiz', {
        templateUrl: 'startAQuiz.html',
        controller: 'StartAQuizCtrl'
        })
    .when('/returnPage', {
        templateUrl: 'returnPage.html',
        controller: 'ReturnCtrl'
    })
    .when('/day3', {
        templateUrl: 'day3.html',
        controller: 'Day3Ctrl'
    })
    .when('/tutorial', {    /* added for tutorial */
        templateUrl: 'tutorial.html',
        controller: 'TutorialCtrl'
    })
    .otherwise({
        redirectTo: '/about'
    });
})
.service('myService', function() {
    console.log("Service declared");
    this.identiKey = "";
    this.docID = "";
    this.firstName = "";
    this.lastName = "";
    this.studentID = "";
    this.university = "";
    this.professor = "";
    this.docName = "";
    this.questionsGenerated = false;
    this.questions = "";
    this.numIncorrect = 0;
    this.numPartial = 0;
    this.numCorrectINA = 0;
    this.numCorrectReturn = 0;
    this.numCorrectINB = 0;
    this.APercent = 0;
    this.BPercent = 0;
    this.numTossed = 0;
    this.subject = "";
    this.returnID = "";
    this.n = 0;
});

