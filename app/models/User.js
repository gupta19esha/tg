import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
userSchema.index({ email: 1 }, { unique: true });

// Add a pre-save hook for additional validation or modifications
userSchema.pre('save', function(next) {
  // You can add custom validation or modification logic here
  next();
});

// Handle the case where the model might already be compiled
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
