
/* about.js */
/* Authors: Ryan Tabler */
/* This defines a controller for the "About" view in about.html. I don't know if defining an empty controller like this is
 * necessary, but I had to get it to get the ng-view to work. */
 
angular.module('quizMeApp')
.controller('AboutCtrl',
    ['$scope',
    function AboutCtrl( $scope ) {
        'use strict';
        $scope.meta = {
            title: "About Page"
        };
    }]
);
