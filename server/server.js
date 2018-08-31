const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const controller = require('./controller/controller');

const app = express();
app.use(bodyParser.json());

app.use('/api', controller);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

module.exports = {app}