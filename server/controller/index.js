const express = require('express');

const authController = require('./authController');
const postController = require('./postController');
const userPostsController = require('./userPostsController');
const commentController = require('./commentController');

const router = express.Router();

router.get('/protected', (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  res.send('Hidden message');
});

router.use('/auth', authController);
router.use('/posts', postController);
router.use('/users', userPostsController);
router.use('/comments', commentController);

module.exports = router;








