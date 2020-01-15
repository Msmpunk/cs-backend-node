/**
 * Modelo para usuarios
 */

import mongoose from 'mongoose';

const publishmentSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  likes: {
    type: String,
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId, ref: 'User'
  },
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comments' }]
});

export const Publishment = mongoose.model('Publishment', publishmentSchema);

