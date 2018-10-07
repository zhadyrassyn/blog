angular
  .module('registrationModule')
  .component('registrationComponent', {
    controllerAs: 'vm',
    controller: function ($scope, loginService, $cookies, $rootScope, $state) {
      const vm = $scope.vm;
      // console.log($cookies.getAll());
      vm.register = function(email, password, passwordAgain) {
        console.log(email, password, passwordAgain);

        if (password !== passwordAgain) {
          vm.flashError = "Passwords should be equal";
        } else {
          console.log('registration ');
          loginService.register(email, password)
            .then((response) => {
              console.log('response ', response);
              $rootScope.session = response;
              $state.go('index');
            })
            .catch((error) => {
              console.log('error ', error);
            });
        }
      }
    },
    templateUrl: '/registration/register.html',
  });