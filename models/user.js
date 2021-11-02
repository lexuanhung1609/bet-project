import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullName: String,
  confirmPassword: String,
  email: String,
  phone: String,
  dob: Date,
  role: [String],
});

export const User = mongoose.model('user', userSchema);
