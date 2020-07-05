(function () {
    'use strict';

    angular
        .module('app')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope', '$state', 'authService', '$transitions'];

    function stateHandler($rootScope, $state, authService, $transitions) {
        return {
            initialize: initialize
        };

        function initialize() {

            console.log('asds')

            $transitions.onBefore({}, function (transition) {
                console.log(transition.to())
                console.log("before any state");
                if(transition.to().name !== 'callback') {
                    window.localStorage.setItem('n-3', window.localStorage.getItem('n-2'))
                    window.localStorage.setItem('n-2', window.localStorage.getItem('n-1'))
                    window.localStorage.setItem('n-1', transition.to().name)
                }
                
                $rootScope.toState = transition.to().name;
                $rootScope.toStateParams = transition.to().params;
                $rootScope.fromState = transition.from().name;

                console.log($rootScope.toState);
                console.log($rootScope.fromState);

                if (localStorage.getItem('isLoggedIn') === 'true') {
                    authService.renewTokens().then(function (result) {
                        return runGuard($rootScope.toState, transition);
                    }, function (err) {
                        console.log('error in renewal');
                        window.localStorage.setItem('to', transition.to().name)
                        return transition.router.stateService.target('login');
                    });
                } else {
                    // Handle the authentication
                    var auth = authService.handleAuthentication();
                    if (auth) {
                        return runGuard($rootScope.toState, transition);
                    } else if ($rootScope.toState !== 'login' && $rootScope.toState !== 'callback') {
                        window.localStorage.setItem('to', transition.to().name)
                        return transition.router.stateService.target('login');
                    }
                }
            });
        }

        function runGuard(toState, transition) {
            if (toState !== 'login' && toState !== 'callback') {
                if (!authService.isAuthenticated()) {
                    window.localStorage.setItem('to', transition.to().name)
                    return transition.router.stateService.target('login');
                }
            }
        }
    }


})();