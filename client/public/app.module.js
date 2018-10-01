const app = angular.module('root', ['blogList', 'postDetail', 'ui.router', 'navigation', 'login', 'ngCookies']);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $locationProvider.html5Mode(true);

  const states = [{
    name: 'index',
    url: '/',
    component: 'blogListComponent'
  }, {
    name: 'detail',
    url: '/detail/{postID}',
    component: 'postDetailComponent'
  }, {
    name: 'login',
    url: '/login',
    component: 'loginComponent'
  }];

  /* eslint arrow-parens:0 */
  states.forEach(state => $stateProvider.state(state));

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
});
