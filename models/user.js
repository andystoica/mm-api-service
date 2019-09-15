const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

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

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 5);
  next();
});

UserSchema.methods.comparePassword = function(password) {
  return Bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('api.jwtPrivateKey'));
  return token;
};

const validateUser = (user) => {
  const validationSchema = {
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, validationSchema);
};

module.exports.User = mongoose.model('user', UserSchema);
module.exports.validateUser = validateUser;
