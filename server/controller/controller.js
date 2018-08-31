const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => {
  res.send('Fetching all posts');
});

router.get('/posts/:id', (req, res) => {
  res.send('Fetching the post');
});

router.put('/posts', (req, res) => {
  res.send('Saving new post');
});

router.delete('/posts/:id', (req, res) => {
  res.send('Deleting the post');
});

router.post('/posts/:id', (req, res) => {
  res.send('Updating the post');
});

module.exports = router;