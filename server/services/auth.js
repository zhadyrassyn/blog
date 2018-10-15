const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const User = require('./../models/user');

passport.use(new LocalStrategy({usernameField: 'email'},
  (email, password, done) => {

    User.findOne({email: email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if(!user) {
        return done(null, false, {message: 'Incorrect email or password'});
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      })
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing user ', user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializing user ', id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;