angular
  .module('blogList')
  .component('blogListComponent', {
    controllerAs: 'vm',
    controller: function(postsService, $state, $cookies) {
      const vm = this;
      vm.posts = [];

      postsService.getPosts()
        .success(({posts}) => {
          vm.posts = posts;
        })
        .error(err => console.log('error ', err));
    },
    templateUrl: '/posts-list/posts-list.html'
  });