const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const commentsRouter = require('./routes/comments');
const app = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/comments', commentsRouter);

// Error Handling
app.use((req, res, next) => {
  res.status(404).send({ error: 'Resource not found' });
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    res.status(500).json({ error: err.stack });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
