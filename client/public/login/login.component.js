angular
  .module('login')
  .component('loginComponent', {
    controllerAs: 'vm',
    controller: function($scope, $http, $rootScope, $state, $cookies) {

      var vm = $scope.vm;
      vm.test = "login component";
      console.log('123');
      console.log($cookies.getObject('connect.sid'));
      vm.login = function(email, password) {
        $http.post('/api/login', {email, password})
          .then(response => {
            console.log('response ', response);
            // $rootScope.session = response.data;
            $state.go('/');
          }).catch(error => console.log('error ', error));
      }
    },
    templateUrl: '/login/login.html'
  });