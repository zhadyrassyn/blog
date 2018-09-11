const app = angular.module('root', ['blogList', 'postDetail', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  const states = [{
    name: 'index',
    url: '/',
    component: 'blogListComponent'
  }, {
    name: 'detail',
    url: '/detail/{postID}',
    component: 'postDetailComponent'
  }];

  states.forEach(state => $stateProvider.state(state));

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
});
