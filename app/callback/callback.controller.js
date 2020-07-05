(function () {

  'use strict';

  angular
    .module('app')
    .controller('CallbackController', callbackController);

    callbackController.$inject = ['authService', '$state'];

  function callbackController(authService, state) {
    state.go(window.localStorage.getItem('to'));
  }

})();