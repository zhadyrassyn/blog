const postsService = angular.module('postsServiceModule', []);

postsService.factory('postsService', ($http) => {
  const posts = [];

  return {
    getPosts: () => {
      return $http.get('/api/posts');
    }
  }
});
