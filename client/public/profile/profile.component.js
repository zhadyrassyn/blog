angular
  .module('profileModule')
  .component('profileComponent', {
    controllerAs: 'vm',
    controller: function(usersService, $rootScope, $cookies, postsService) {
      var vm = this;
      vm.school = "Decode";
      vm.showAddModalFlag = false;

      vm.posts = [];
      var user = $cookies.getObject("session");
      console.log('user ', user);

      usersService.getPosts(user._id)
        .then(response => {
          if (response.status === 200) {
            vm.posts = response.data.posts;
          }
        }).catch(error => {
          console.log('error ', error);
      });

      vm.showAddModal = () => {
        vm.showAddModalFlag = true;
      };

      vm.removeAddModal = () => {
        vm.showAddModalFlag = false;
        vm.postTitle = "";
        vm.postContent = "";
        vm.image = null;
      };

      vm.savePost = (title, content, image) => {
        console.log(title, content, image);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', image);

        usersService.savePost(user._id, formData)
          .success(post => {
            vm.removeAddModal();
            vm.posts.push(post);
          })
          .error(err => console.log('error ', err));
      }

      vm.deletePost = (post) => {
        postsService.deletePost(post._id)
          .success(post => {
            vm.posts = vm.posts.filter(it => it._id !== post._id);
          })
          .error(err => {
            console.log('error ', err);
          })
      }

      vm.showEditModalFlag = false;
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

      vm.updatePost = (title, content, id) => {
        const post = {
          title, content
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
    templateUrl: '/profile/profile.html'
  });