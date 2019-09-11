const Joi = require('@hapi/joi');
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
    default: Date.now
  }
});

const Message = mongoose.model('message', MessageSchema);

const validateMessage = (message) => {
  const validationSchema = {
    userId: Joi.string().required(),
    message: Joi.string().required(),
    date: Joi.date()
  };
  return Joi.validate(message, validationSchema);
};

module.exports.Message = Message;
module.exports.validate = validateMessage;
