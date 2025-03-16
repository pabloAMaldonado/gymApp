const mongoose = require('mongoose');

const { Schema } = mongoose;

const passwordValidator = (value) => {
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(value)) {
    throw new Error('Password must contain at least one uppercase letter');
  }

  // Check for at least one symbol (non-alphanumeric character)
  if (!/[^A-Za-z0-9]/.test(value)) {
    throw new Error('Password must contain at least one symbol');
  }

  return true;
};

const mediaValidator = (mediaItem) => /^public\/uploads\/.+/.test(mediaItem.path);

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    validate: [passwordValidator, 'Password validation failed, It s need at least a mayus character and a symbol']
  },
  username: {
    type: String,
    minlength: 4,
    required: true
  },
  profileImg: {
    type: {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number
    },
    validate: { validator: mediaValidator, message: 'No se permiten rutas de contenido inválidas' }
  },
  data: [{
    height: {
      type: Number
    },
    weight: {
      type: Number
    },
    years: {
      type: Number
    },
    date: {
      type: Date
    }
  }],
  routines: [{
    own: [{
      type: Schema.Types.ObjectId,
      ref: 'Routine'
    }],
    public: [{
      type: Schema.Types.ObjectId,
      ref: 'Routine'
    }]
  }],
  verified: {
    type: Boolean,
    default: false
  },
  verification: {
    type: String
  },
  status: {
    type: String,
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);
