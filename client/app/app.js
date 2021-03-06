'use strict';

angular.module('dashboardApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'stormpath',
  'stormpath.templates'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function ($stormpath) {
      $stormpath.uiRouter({
         loginState: 'login',
         defaultPostLoginState: 'main' 
      });
  });
