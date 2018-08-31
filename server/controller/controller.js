const express = require('express');
const {ObjectID} = require('mongodb');
const router = express.Router();

const {Post} = require('./../models/post');

router.get('/posts', (req, res) => {
  Post.find().then(posts => {
    res.send({posts})
  }).catch(e => {
    res.status(400).send(e);
  });
});

router.get('/posts/:id', (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(400).send();
  }


  Post.findById(id).then(post => {
    if (!post) {
      return res.status(404).send();
    }

    res.send({post});
  }).catch(e => res.status(400).send(e) );
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