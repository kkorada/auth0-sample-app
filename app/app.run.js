(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['authService', '$transitions', '$rootScope', '$trace', 'stateHandler'];

  function run(authService, $transitions, $rootScope, $trace, stateHandler) {

    console.log('asd');

    stateHandler.initialize();



    // $trace.enable('TRANSITION');

    // $transitions.onBefore({}, function (transition) {
    //   console.log(transition.to())
    //   console.log(transition.from())
    //   console.log("before any state");
    // });
  }

})();