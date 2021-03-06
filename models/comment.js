const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const validateComment = (comment) => {
  const validationSchema = {
    userId: Joi.string().required(),
    parentId: Joi.string().required(),
    comment: Joi.string().required()
  };
  return Joi.validate(comment, validationSchema);
};

module.exports.Comment = mongoose.model('comment', CommentSchema);
module.exports.validateComment = validateComment;
