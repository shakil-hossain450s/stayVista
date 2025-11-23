const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Verified'
  },
  provider: {
    type: String,
    enum: ['password', 'google'],
    default: 'password'
  },
  role: {
    type: String,
    enum: ['guest', 'host', 'admin'],
    default: 'guest'
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);