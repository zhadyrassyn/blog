const postsService = angular.module('postsServiceModule', []);

postsService.factory('postsService', ($http) => {
  return {
    getPosts: () => {
      return $http.get('/api/posts');
    },

    deletePost: (id) => {
      return $http.delete(`/api/posts${id}`)
    }
  }
});
