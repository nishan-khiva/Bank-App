const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Custumer',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  avlbalance: {
  type: Number,
  required: true,
  default: 0,
},
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
