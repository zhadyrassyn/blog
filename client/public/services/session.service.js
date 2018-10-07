servicesModule.factory('sessionService', () => {
  let session = null;

  return {
    get: () => {
      console.log('get: session ', session);
      return session;
    },
    set: (value) => {
      session = value;
      console.log('set: session ', session);
    }
  }
});