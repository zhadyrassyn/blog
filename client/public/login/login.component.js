angular
  .module('login')
  .component('loginComponent', {
    controllerAs: 'vm',
    controller: function($http, $state, $cookies, loginService, sessionService, $rootScope) {
      var vm = this;

      vm.login = function(email, password) {
        loginService.login(email, password)
          .then(response => {
            $rootScope.session = response;
            $state.go('index');
          }).catch(error => console.log('error ', error));
      }
    },
    templateUrl: '/login/login.html'
  });