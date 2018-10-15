const express = require('express');

const authController = require('./authController');
const postController = require('./postController');

const router = express.Router();

router.get('/protected', (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  res.send('Hidden message');
});

router.use('/auth', authController);
router.use('/posts', postController);

module.exports = router;








