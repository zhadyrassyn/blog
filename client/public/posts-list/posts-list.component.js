angular
  .module('blogList')
  .component('blogList', {
    controllerAs: 'vm',
    controller: ($scope, postsService) => {
      const vm = $scope.vm;
      vm.showAddModalFlag = false;
      vm.showEditModalFlag = false;
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

      vm.savePost = (author, title, content, image) => {
        const formData = new FormData();
        formData.append('author', author);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', image);

        postsService.savePost(formData)
          .success(post => {
            vm.removeAddModal();
            vm.posts.push(post);
          })
          .error(err => console.log('error ', err));
      }

      vm.showEditModal = (post) => {
        vm.showEditModalFlag = true;
        vm.editAuthor = post.author;
        vm.editTitle = post.title;
        vm.editContent = post.content;
        vm.editId = post._id;
      }

      vm.removeEditModal = () => {
        vm.showEditModalFlag = false;
      }

      vm.updatePost = (author, title, content, id) => {
        const post = {
          author, title, content
        }

        postsService.updatePost(id, post)
          .success(post => {
            const index = vm.posts.findIndex(it => it._id === id);
            if(index !== -1) {
              vm.posts.splice(index, 1, post);
            }
          })
          .error(err => console.log('error ', err));

        vm.removeEditModal();
      }
    },
    templateUrl: '/posts-list/posts-list.html'
  });