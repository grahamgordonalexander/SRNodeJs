const mongoose = require('mongoose');

const runnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: { type: String, enum: ['Vancouver', 'Los Angeles', 'New York City'] },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Runner', runnerSchema);
