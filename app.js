const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const commentsRouter = require('./routes/comments');
const mongoose = require('mongoose');

// Database
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/mmm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
}

// Middleware
const app = express();
app.use(bodyParser.json());

// Routes
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/comments', commentsRouter);

// Error handling
app.use((req, res, next) => {
  res.status(404).send('Resource not found.');
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev') {
    res.status(500).json({ error: err.stack });
  } else {
    res.status(500).json({ error: 'Internal server' });
  }
});

module.exports = app;
