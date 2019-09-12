const config = require('config');
const mongoose = require('mongoose');
const connectionString = config.get('db.uri') + config.get('db.name');

before((done) => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB:', connectionString, '\n');
    done();
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB Error:', err);
  });
});
