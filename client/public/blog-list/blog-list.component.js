angular
  .module('blogList')
  .component('blogList', {
    controller: ($scope, postsService) => {
      $scope.posts = [];

      postsService.getPosts()
        .success(({posts}) => {
          $scope.posts = posts;
        })
        .error(err => console.log('error ', err))
    },
    templateUrl: '/blog-list/blog-list.html'
  });