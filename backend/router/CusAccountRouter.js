const express = require('express');
const router = express.Router();
const {
  depositAmount,
  withdrawAmount,
  getCustomerTransactions
} = require('../controllers/CusAccountController');

// 💰 Deposit
router.post('/deposit', depositAmount);

// 💸 Withdraw
router.post('/withdraw', withdrawAmount);

// 📄 Get all transactions of a customer using account number
router.get('/history/:accountno', getCustomerTransactions);

module.exports = router;
