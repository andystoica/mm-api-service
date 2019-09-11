const mongoose = require('mongoose');

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

beforeEach((done) => {
  const { users } = mongoose.connection.collections;
  users
    .drop()
    .then(() => done())
    .catch(() => done());
});
