servicesModule.factory('usersService', ($http) => {
  return {
    getPosts: (id) => {
      return $http.get(`/api/users/${id}/posts`);
    },

    savePost: (id, formData) => {
      return $http.put(`/api/users/${id}/posts`, formData, {
        headers: {
          'Content-type': undefined,
          'accept': 'application/json'
        },
      });
    },
  };
});
