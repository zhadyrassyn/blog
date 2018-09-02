const postsService = angular.module('postsServiceModule', []);

postsService.factory('postsService', ($http) => {
  return {
    getPosts: () => {
      return $http.get('/api/posts');
    }
  }
});
