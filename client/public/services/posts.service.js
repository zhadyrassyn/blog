servicesModule.factory('postsService', ($http) => {
  return {
    getPosts: () => {
      return $http.get('/api/posts');
    },

    deletePost: (id) => {
      return $http.delete(`/api/posts/${id}`)
    },

    savePost: (formData) => {
      return $http.put('/api/posts', formData, {
        headers: {
          'Content-type': undefined,
          'accept': 'application/json'
        },
      });
    },

    getPost: (id) => {
      return $http.get(`/api/posts/${id}`);
    },

    updatePost: (id, post) => {
      return $http.post(`/api/posts/${id}`, post, {
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
      });
    },
  };
});
