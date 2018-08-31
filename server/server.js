const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});