const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model('user', UserSchema);

const validateUser = (user) => {
  const validationSchema = {
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, validationSchema);
};

module.exports.User = User;
module.exports.validate = validateUser;
