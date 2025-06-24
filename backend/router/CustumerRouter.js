const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads'); // Assuming uploads.js is in middleware folder
const { registerCustumer, loginCustumer, getAllCustumers, getCustumerById, getCustumerByAccountNo } = require('../controllers/CustumerController');
const { authenticate, authorizeRoles } = require('../middleware/Auth');

// Use these if customers are registered by employees
router.post('/register', authenticate, authorizeRoles("admin", "manager"), upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
]), registerCustumer);

router.get('/getcustumers', authenticate, authorizeRoles("admin", "manager", "cashier"), getAllCustumers);
router.get('/:custumerId', authenticate, authorizeRoles("admin", "manager", "cashier"), getCustumerById);

// Get customer by account number
router.get('/accountno/:accountno', getCustumerByAccountNo);

// If customers self-register, use this instead:
// router.post('/register', registerCustomer);

router.post('/login', loginCustumer);

module.exports = router;
