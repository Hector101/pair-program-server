import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

function arrayLimit (value) {
  return value.length >= 1;
}

const sessionSchema = new Schema({
  name: {
    type: String,
    default: 'Untitled Session'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sessioncreator: {
    type: Schema.Types.ObjectId
  },
  privacy: {
    type: Boolean,
    default: false
  },
  participants: {
    type: [{ type: Schema.Types.ObjectId, required: 'No participants', ref: 'User' }],
    validate: [arrayLimit, '{PATH} minimum of 1 participants required']
  }
});

sessionSchema.plugin(uniqueValidator, { message: 'session already exist' });

export default mongoose.model('Session', sessionSchema);
