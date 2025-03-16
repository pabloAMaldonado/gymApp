const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExcerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    required: true
  },
  example: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  comments: [{
    type: String,
    createdAt: Date.now(),
    commentBy: Schema.Types.ObjectId
  }],
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const PendingExcerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    required: true
  },
  example: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const PendingExcercise = mongoose.model('pendingExcercise', PendingExcerciseSchema);
const Excercise = mongoose.model('excercise', ExcerciseSchema);

module.exports = {
  PendingExcercise,
  Excercise
};
