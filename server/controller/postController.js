const express = require('express');
const {ObjectID} = require('mongodb');
const multer = require('multer');
const upload = multer({dest: 'server/uploads/'});
const base64Img = require('base64-img');

const router = express.Router(); // eslint-disable-line new-cap

const {Post} = require('./../models/post');

router.put('/', upload.single('file'), (req, res) => {
  const {title, content, author} = req.body;
  const post = new Post({
    title,
    content,
    author,
  });

  if (req.file) {
    base64Img.base64(req.file.path, (err, data) => {
      if (!err) {
        post.image = data;
        save(post, res);
      } else {
        console.error('error ', err);
      }
    });
  } else {
    save(post, res);
  }
});

const save = (post, res) => {
  post.save(post).then((doc) => {
    res.status(201).send(doc);
  }).catch((e) => res.status(400));
};

router.get('/', (req, res) => {
  console.log(req.isAuthenticated());
  Post.find().then((posts) => {
    res.send({posts});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Post.findById(id).then((post) => {
    if (!post) {
      return res.status(404).send();
    }

    res.send({post});
  }).catch((e) => res.status(400).send(e));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Post.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).send();
    }

    res.send(doc);
  }).catch((err) => res.status(404).send());
});

router.post('/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  const {title, content} = req.body;
  const data = {
    title,
    content,
  };

  Post.findByIdAndUpdate(id, {$set: data}, {new: true}).then((doc) => {
    if (!doc) {
      return res.status(404).send();
    }
    res.send(doc);
  }).catch((err) => res.status(400).send(err));
});

module.exports = router;
