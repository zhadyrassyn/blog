const postsService = angular.module('postsServiceModule', []);

postsService.factory('postsService', ($http) => {
  return {
    getPosts: () => {
      return $http.get('/api/posts');
    },

    deletePost: (id) => {
      return $http.delete(`/api/posts/${id}`)
    },

    savePost: (post) => {
      return $http.put('/api/posts', post, {
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        }
      });
    }
  }
});
