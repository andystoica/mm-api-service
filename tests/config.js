const mongoose = require('mongoose');
const { User } = require('../models/user');

before((done) => {
  mongoose.connect('mongodb://localhost/mmm_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  mongoose.connection.once('open', () => done());
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB Error:', err);
  });
});
