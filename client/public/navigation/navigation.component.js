angular
  .module('navigation')
  .component('navigationComponent', {
    controller: function($scope) {
      $scope.test = "TEst";
    },
    templateUrl: '/navigation/navigation.html'
  });