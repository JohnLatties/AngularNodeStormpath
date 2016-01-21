'use strict';

angular.module('dashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verify', {
        url: '/verify?sptoken',
        //url: '/register/verify',
        templateUrl: 'app/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  });
