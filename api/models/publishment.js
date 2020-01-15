/**
 * Modelo para usuarios
 */

import mongoose from 'mongoose';

const publishmentSchema = new mongoose.Schema({
  name: {
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
  ocupation: {
    type: String,
    required: true
  },
  socialNetworks:{
    facebook : String,
    twitter : String,
    linkedin : String,
  }
});

export const Publishment = mongoose.model('Publishment', publishmentSchema);

