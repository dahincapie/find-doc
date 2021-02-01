/**
 * Doctor model for mongoose
 */
import mongoose from 'mongoose'
const { Schema } = mongoose

const recognitionsSchema = new Schema({
  title: String,
  description: String
});

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profesion: {
    type: String,
    required: true
  },
  specialties: {
    type: Array,
    require: false
  },
  about: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: false,
    default: 0
  },
  recognitions: {
    type: [recognitionsSchema],
    required: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  profilePic: {
    type: String,
    default: "https://image.flaticon.com/icons/png/128/3304/3304567.png"
  }
});
export default mongoose.model('Doctor', doctorSchema);
