/*eslint null:0*/
const mongoose = require('mongoose'); //eslint-disable-line null
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  name: String
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  })
});


userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, res) {
    if (err) return callback(err);

    callback(null, res);
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;