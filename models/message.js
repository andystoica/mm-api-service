const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Message = mongoose.model('message', MessageSchema);
module.exports.Message = Message;
