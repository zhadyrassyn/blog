angular
  .module('postDetail')
  .component('postDetailComponent', {
    controllerAs: 'vm',
    controller: function(postsService, $state) {
      const vm = this;
      const id = $state.params.postID;

      postsService.getPost(id)
        .then(({data}) => {
          vm.post = data.post;
        }, (error) => {
          console.log('error ', error);
        })
    },
    templateUrl: '/post-detail/post-detail.html'
  });
