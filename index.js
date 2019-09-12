const mongoose = require('mongoose');
const config = require('config');
const app = require('./app');
const port = config.get('api.port');
const dbString = config.get('db.uri') + config.get('db.name');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB:', dbString, '\n');
  });

  mongoose.connection.on('error', (err) => {
    console.log('MongoDB Error:', err);
  });
}

app.listen(port, () => {
  console.info('API server listening on port', port);
});
