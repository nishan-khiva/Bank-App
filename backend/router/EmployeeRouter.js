const express = require('express');
const router = express.Router();
const { registerEmployee, loginEmployee,getEmployee,getAllEmployees, updateEmployee } = require('../controllers/EmployeeController');
const { authenticate, authorizeRoles } = require('../middleware/Auth');

router.post('/register', authenticate, authorizeRoles("admin", "manager"), registerEmployee);
router.post('/login', loginEmployee);
router.get('/getemply', authenticate, authorizeRoles("admin", "manager"), getAllEmployees);
router.get('/:id', authenticate, authorizeRoles("admin", "manager"), getEmployee);
router.put('/:id', authenticate, authorizeRoles("admin", "manager"), updateEmployee);

module.exports = router;