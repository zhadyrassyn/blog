const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const {mongoose} = require('./db/mongoose');
const indexController = require('./controller/index');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(session({
  resave: false,
  secret: 'secret',
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  name: 'sessionID'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexController);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {app};
