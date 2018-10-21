const { mongoose } = require('./../db/mongoose');

const Comment = mongoose.model('Comment', {
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = Comment;