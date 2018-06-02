import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: 'Provide full name'
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator (email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Provide a valid email'
    }
  },
  imageUrl: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  inactive: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', function (next, done) {
  const user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) return next(err);
      user.password = hashedPassword;
      next();
    });
  });
});

mongoose.plugin(uniqueValidator, {message: 'Account already exist'});

export default mongoose.model('User', userSchema);
