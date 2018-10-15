const express = require('express');

const router = express.Router();
const auth = require('./../services/auth');

const User = require('./../models/user');

router.post('/login', auth.authenticate('local'), (req, res, next) => {
  res.cookie('session', JSON.stringify(req.user));
  res.send(req.user);
});

router.post('/signup', (req, res, next) => {
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
      res.cookie('session', JSON.stringify(req.user))
      res.status(200).send(req.user);
    }
  }).catch((error) => console.log('error', error));
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('sessionID');
  res.clearCookie('session');
  res.sendStatus(200);
});

module.exports = router;
