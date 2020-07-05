(function () {

    'use strict';

    angular
        .module('app')
        .controller('SecureController', secureController);

    secureController.$inject = ['authService'];

    function secureController(authService) {

        var vm = this;
        vm.auth = authService;

    }

})();