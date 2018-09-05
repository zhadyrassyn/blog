angular
  .module('blogList')
  .component('blogList', {
    controllerAs: 'vm',
    controller: ($scope, postsService) => {
      const vm = $scope.vm;
      vm.showAddModalFlag = false;
      vm.posts = [];

      postsService.getPosts()
        .success(({posts}) => {
          vm.posts = posts;
        })
        .error(err => console.log('error ', err));

      vm.deletePost = (post) => {
        postsService.deletePost(post._id)
          .success(post => {
            vm.posts = vm.posts.filter(it => it._id !== post._id);
          })
          .error(err => {
            console.log('error ', err);
          })
      }

      vm.showAddModal = () => {
        vm.showAddModalFlag = true;
      }

      vm.removeAddModal = () => {
        vm.showAddModalFlag = false;
        vm.postAuthor = "";
        vm.postTitle = "";
        vm.postContent = "";
      }

      vm.savePost = (author, title, content) => {
        const post = {
          author,
          title,
          content
        }

        postsService.savePost(post)
          .success(post => {
            vm.removeAddModal();
            vm.posts.push(post);
          })
          .error(err => console.log('error ', err));
      }
    },
    templateUrl: '/posts-list/posts-list.html'
  });