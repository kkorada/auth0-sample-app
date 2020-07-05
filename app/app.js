(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'ui.router'])
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    'angularAuth0Provider'
  ];

  function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    angularAuth0Provider
  ) {

    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/login/login.html',
        controllerAs: 'vm',
        onEnter: function () {
          console.log("Entering into state login");
        }
      })
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm',
        onEnter: function () {
          console.log("Entering into state home");
        }
      })
      .state('secure', {
        url: '/secure',
        controller: 'SecureController',
        templateUrl: 'app/secure/secure.html',
        controllerAs: 'vm',
        onEnter: function () {
          console.log("Entering into state secure");
        }
      })
      .state('callback', {
        url: '/callback',
        controller: 'CallbackController',
        templateUrl: 'app/callback/callback.html',
        controllerAs: 'vm',
        onEnter: function () {
          console.log("Entering into state callback");
        }
      });

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: 'If04IT5Y9sKhMWO9WsanAdUuica3aIab',
      domain: 'kkorada.eu.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:8081/callback',
      scope: 'openid'
    });

    $urlRouterProvider.otherwise('/login');

    $locationProvider.hashPrefix('');

    /// Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    $locationProvider.html5Mode(true);
  }

})();