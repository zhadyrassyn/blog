const mongoose = require('mongoose');

const port = 27017;

mongoose.connect(`mongodb://localhost:${port}/blog`, { useNewUrlParser: true })
  .then(() => {
    console.log(`mongoose connected on port ${port}`)
  })
  .catch(e => console.log(e));

module.exports = {mongoose};