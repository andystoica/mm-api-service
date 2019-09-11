const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Comment = mongoose.model('driver', CommentSchema);
module.exports.Comment = Comment;
