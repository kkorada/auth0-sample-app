(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['authService'];

  function homeController(authService) {

    var vm = this;
    vm.auth = authService;

    console.log('asd')

    console.log(authService.isAuthenticated());

  }

})();