angular
  .module('blogList')
  .component('blogList', {
    controller: ($scope, postsService) => {
      $scope.posts = [];

      postsService.getPosts()
        .success(({posts}) => {
          $scope.posts = posts;
        })
        .error(err => console.log('error ', err));

      $scope.deletePost = (post) => {
        console.log('id ', post._id);
      }
    },
    templateUrl: '/posts-list/posts-list.html'
  });