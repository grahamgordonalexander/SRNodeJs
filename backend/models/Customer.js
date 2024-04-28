const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: { type: String, enum: ['Vancouver', 'Los Angeles', 'New York City'] },
});

module.exports = mongoose.model('Customer', customerSchema);
