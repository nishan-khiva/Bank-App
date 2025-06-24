const Transaction = require('../models/CusAccount');
const Custumer = require('../models/CustumersModel');

// 💰 Deposit Amount
exports.depositAmount = async (req, res) => {
  try {
    const { accountno, amount, description } = req.body;

    const customer = await Custumer.findOne({ accountno });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // ✅ Add balance to customer
    customer.avlbalance += Number(amount);
    await customer.save();

    // ✅ Save the new balance in the transaction
    const transaction = await Transaction.create({
      customerId: customer._id,
      type: 'deposit',
      amount: Number(amount),
      description,
      avlbalance: customer.avlbalance,
    });

    res.status(200).json({
      message: 'Amount deposited successfully',
      transaction,
    });
  } catch (err) {
    res.status(500).json({ message: 'Deposit failed', error: err.message });
  }
};

// 💸 Withdraw Amount
exports.withdrawAmount = async (req, res) => {
  try {
    const { accountno, amount, description } = req.body;

    const customer = await Custumer.findOne({ accountno });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if ((customer.avlbalance || 0) < Number(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    customer.avlbalance -= Number(amount);
    await customer.save();

    const transaction = await Transaction.create({
      customerId: customer._id,
      type: 'withdrawal',
      amount: Number(amount),
      description,
      avlbalance: customer.avlbalance,
    });

    res.status(200).json({
      message: 'Withdrawal successful',
      transaction,
    });
  } catch (err) {
    res.status(500).json({ message: 'Withdrawal failed', error: err.message });
  }
};

// 📄 Get All Transactions for One Customer
exports.getCustomerTransactions = async (req, res) => {
  try {
    const { accountno } = req.params;

    const customer = await Custumer.findOne({ accountno });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const transactions = await Transaction.find({ customerId: customer._id }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
  }
};
