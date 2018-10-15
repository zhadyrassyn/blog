servicesModule.factory('loginService', ($http) => {
  return {
    login: (email, password) => {
      return $http.post('/api/auth/login', {email, password});
    },
    register: (email, password) => {
      return $http.post('/api/auth/signup', {email, password});
    },
    logout: () => {
      return $http.get('/api/auth/logout');
    }
  }
});