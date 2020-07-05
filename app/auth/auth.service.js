(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout', '$q'];

  function authService($state, angularAuth0, $timeout, $q) {

    var accessToken;
    var idToken;
    var expiresAt;

    function getIdToken() {
      return idToken;
    }

    function getAccessToken() {
      return accessToken;
    }

    function login() {
      angularAuth0.authorize();
    }

    function getParameterByName(name) {
      var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function handleAuthentication() {
      var authResult = {
        accessToken: getParameterByName('access_token'),
        idToken: getParameterByName('id_token'),
        expiresIn: getParameterByName('expires_in')
      }
      if (authResult.accessToken && authResult.idToken) {
        localLogin(authResult);
        return true;
      } else {
        console.log('error in handle auth');
        return false;
      }
      // angularAuth0.parseHash(function (err, authResult) {
      //   if (authResult && authResult.accessToken && authResult.idToken) {
      //     localLogin(authResult);
      //     // $state.go('home');
      //   } else if (err) {
      //     $timeout(function () {
      //       $state.go('login');
      //     });
      //     console.log(err);
      //     alert('Error: ' + err.error + '. Check the console for further details.');
      //   }
      // });
    }

    function localLogin(authResult) {
      // Set isLoggedIn flag in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Set the time that the access token will expire at
      expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      accessToken = authResult.accessToken;
      idToken = authResult.idToken;
    }

    function renewTokens() {
      var deferred = $q.defer();
      angularAuth0.checkSession({},
        function (err, result) {
          if (err) {
            console.log(err);
            deferred.reject(err);
          } else {
            localLogin(result);
            deferred.resolve(result);
          }
        }
      );
      return deferred.promise;
    }

    function logout() {
      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem('isLoggedIn');
      // Remove tokens and expiry time
      accessToken = '';
      idToken = '';
      expiresAt = 0;

      angularAuth0.logout({
        returnTo: window.location.origin
      });

      $state.go('home');
    }

    function isAuthenticated() {
      // Check whether the current time is past the 
      // access token's expiry time
      return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      getIdToken: getIdToken,
      getAccessToken: getAccessToken,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated,
      renewTokens: renewTokens
    }
  }
})();