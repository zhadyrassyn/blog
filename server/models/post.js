const {mongoose} = require('./../db/mongoose');

const Post = mongoose.model('Post', {
  title: String,
  content: String,
  // author: String,
  date: {
    type: Date,
    default: Date.now()
  },
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = {Post};