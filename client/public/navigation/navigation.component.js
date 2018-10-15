angular
  .module('navigation')
  .component('navigationComponent', {
    controllerAs: 'vm',
    controller: function($scope, $cookies, loginService, sessionService, $rootScope) {
      const vm = $scope.vm;

      // $rootScope.$on('n', function(event, data) {
      //   vm.session = data;
      // });

      if ($cookies.get('session')) {
        $rootScope.session = $cookies.getObject('session');
      }

      vm.logout = function() {

        loginService.logout()
          .then(response => {
            console.log('response ', response);
            $rootScope.session = undefined;
          })
          .catch(error => {
            console.log('error ', error);
          });
      }
    },
    templateUrl: '/navigation/navigation.html'
  });