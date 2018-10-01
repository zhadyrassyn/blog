const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const {mongoose} = require('./db/mongoose');
const controller = require('./controller/controller');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(session({
  resave: false,
  secret: 'secret',
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}));


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
    console.log('213');
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', controller);

app.post('/api/login', passport.authenticate('local'), (req, res, next) => {
  res.cookie('session', JSON.stringify(req.user))
  res.send(req.user)
});

app.get('/api/users', (req, res, next) => {
  User.find().then((response) => res.send(response))
    .catch((err) => console.log('err ', err));
})

app.post('/api/signup', (req, res, next) => {
  const {email, password} = req.body;
  const user = new User({
    email,
    password,
  });

  user.save().then((user) => {
    if (user) {
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
      });
      res.status(200).send();
    }
  }).catch((error) => console.log('error', error));
});

app.get('/api/protected', (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  res.send('Hidden message');
})


app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {app};
