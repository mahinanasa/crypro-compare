/* eslint-disable linebreak-style */

const mongoose = require('mongoose');
const { mongoDbUrl } = require('./keys');

const connect = () => {
  mongoose.connect(mongoDbUrl, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Successfully established connection to database');
    })
    .catch((err) => {
      console.log('Unable to connect to database', err);
    });
};
module.exports = {
  connect,
};
 