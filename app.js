const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const commentsRouter = require('./routes/comments');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/mmm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
}

const app = express();
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/comments', commentsRouter);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
