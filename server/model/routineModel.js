const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoutineSchema = new Schema({
  distribution: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  privacy: {
    type: String,
    require: true

  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  days: {
    monday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    },
    tuesday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    },
    wednesday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    },
    thursday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    },
    friday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    },
    saturday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    },
    sunday: {
      exercises: [{
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise'
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }]
    }
  }
});

module.exports = mongoose.model('Routine', RoutineSchema);
