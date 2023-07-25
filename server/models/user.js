const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  cart: {
    type: Array,
    default: []
  },
  address: [{
    type: mongoose.Types.ObjectId,
    ref: 'Address'
  }],
  // list ID product like
  wishlist: [{
    type: mongoose.Types.ObjectId,
    ref: 'Address'
  }],
  isBlocked: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String
  },
  // password new when change
  passwordChangeAt: {
    type: String
  },
  // token set new password when send gmail
  passwordResetToken: {
    type: String
  },
  // time exxpire password token
  passwordResetExpire: {
    type: String
  }
}, {
  timestamps: true
});

//Export the model
module.exports = mongoose.model('User', userSchema);