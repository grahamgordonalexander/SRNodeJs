const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  runner: { type: mongoose.Schema.Types.ObjectId, ref: 'Runner' },
  item: String,
  agreedPrice: Number,
  eta: String,
  customerConfirmed: { type: Boolean, default: false },
  runnerConfirmed: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending', 'Agreed', 'Accepted', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);
