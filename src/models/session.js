import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

function arrayLimit (value) {
  return value.length >= 1 && value.length <= 5;
}

const sessionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'session name required'
  },
  participants: {
    type: [{ type: String, required: 'invalid name entered' }],
    validate: [arrayLimit, '{PATH} minimum of 1 and maximum of 5 participants required']
  }
});

sessionSchema.plugin(uniqueValidator, { message: 'session already exist' });

export default mongoose.model('Session', sessionSchema);
