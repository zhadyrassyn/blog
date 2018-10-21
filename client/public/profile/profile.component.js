angular
  .module('profileModule')
  .component('profileComponent', {
    controllerAs: 'vm',
    controller: function(usersService, $rootScope, $cookies) {
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


    },
    templateUrl: '/profile/profile.html'
  });