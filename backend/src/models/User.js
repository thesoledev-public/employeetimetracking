const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
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
    enum: ['Superuser', 'Administrator', 'Subscriber', 'Subs-child'],
    required: true,
    default: 'Subscriber' 
  },
  companyId: { // Define companyId field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Add a virtual property 'profile' to the User schema for UserProfile
UserSchema.virtual('profile', {
  ref: 'UserProfile', // The model to use
  localField: '_id', // Find in UserProfile where 'userId'
  foreignField: 'userId', // is equal to '_id' in User
  justOne: true // Only return one UserProfile per User
});

// Ensure virtuals are included when converting documents to objects and JSON
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
