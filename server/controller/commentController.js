const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Post = require('./../models/post').Post;
const Comment = require('./../models/comment');

router.put('/users/:userId/posts/:postId', (req,res) => {
  const { userId, postId } = req.params;
  const { text } = req.body;

  User.findById(userId)
    .then((author) => {
      if (!author) {
        return res.sendStatus(400);
      }
      Post.findById(postId)
        .then((post) => {
          if(!post) {
            return res.sendStatus(400);
          }

          const comment = new Comment({
            text,
            author: author._id,
            post: post._id,
          });

          comment.save().then((doc) => {
            if (!doc)
              return res.sendStatus(400);

            post.comments.push(doc._id);
            post.save()
              .then((savedPost) => res.send(doc).status(201))
              .catch((error) => res.send({error}).status(400));
          }).catch((error) => res.send({error}).status(400));
        }).catch((error) => res.send({error}).status(400));
    }).catch((error) => res.send({error}).status(400));
});

router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;
  Comment.findByIdAndDelete(commentId)
    .populate('post')
    .then((comment) => {
      if(!comment)
        return res.sendStatus(400);
      Post.findById(comment.post._id)
        .then((post) => {
          if (!post)
            return post.sendStatus(400);
          post.comments = post.comments.filter(it => it.toString() !== commentId);

          post.save()
            .then((reSavedPost) => {
              res.send();
            }).catch((error) => res.send({ error }).sendStatus(400));
        }).catch((error) => res.send({ error }));
    }).catch((error) => res.send({ error }).status(400));
});

module.exports = router;