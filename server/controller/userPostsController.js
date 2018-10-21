const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({dest: 'server/uploads/'});
const base64Img = require('base64-img');

const Post = require('./../models/post').Post;
const User = require('./../models/user');

// User.findOne({email: 'daniyar@test.com'})
//   .then((response) => {
//     var post = new Post({
//       title: 'Dependent post',
//       content: 'Something',
//       author: response
//     });
//     // post.save().then((res) => console.log('res ', res)).catch(err => console.log('err ', err));
//     // console.log('response ', response);
//   })
//   .catch(error => console.log('error ', error));

router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  Post.find({'author': id})
    .then(posts => {
      res.send({posts: posts});
    })
    .catch(error => {
      res.send({error}).status(400);
    });
});

router.put('/:id/posts', upload.single('file'), (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;
  const post = new Post({
    title,
    content,
    author: id
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

module.exports = router;