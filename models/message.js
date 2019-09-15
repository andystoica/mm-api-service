const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const validateMessage = (message) => {
  const validationSchema = {
    userId: Joi.string().required(),
    message: Joi.string().required()
  };
  return Joi.validate(message, validationSchema);
};

module.exports.Message = mongoose.model('message', MessageSchema);
module.exports.validateMessage = validateMessage;
