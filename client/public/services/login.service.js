servicesModule.factory('loginService', ($http) => {
  return {
    login: (email, password) => {
      return $http.post('/api/login', {email, password});
    },
    register: (email, password) => {
      return $http.post('/api/signup', {email, password});
    },
    logout: () => {
      return $http.get('/logout');
    }
  }
});