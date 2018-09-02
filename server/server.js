const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {mongoose} = require('./db/mongoose');
const controller = require('./controller/controller');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/api', controller);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

module.exports = {app}