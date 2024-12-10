const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  fromAccount: { type: String, required: true, match: /^\d{16}$/ },
  toAccount: { type: String, required: true, match: /^\d{16}$/ },
  expMonth: { type: String, required: true, match: /^(0[1-9]|1[0-2])$/ },
  expYear: { type: String, required: true, match: /^\d{2}$/ },
  cvc: { type: String, required: true, match: /^\d{3,4}$/ },
  totalAmount: { type: Number, required: true, min: 1 },
  userId: { type: String, required: true },
  status: { type: String, default: 'payed' },
  createdAt: { type: Date, default: Date.now },
  id: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema); // Use capitalized model name
module.exports = Payment;
