const Employee = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Employee
const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Employee already exists' });

    const currentUserRole = req.user.role;
    if (currentUserRole === "manager" && role === "admin") {
      return res.status(403).json({ message: "Manager is not allowed to add Admin." });
    }

    const lastEmployee = await Employee.findOne().sort({ employeeId: -1 });
    const nextEmployeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1050;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      employeeId: nextEmployeeId,
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newEmployee.save();

    res.status(201).json({
      message: 'Employee registered successfully',
      employeeId: newEmployee.employeeId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while registering employee' });
  }
};

// Employee Login
const loginEmployee = async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    const employee = await Employee.findOne({ employeeId });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      {
        id: employee._id,
        employeeId: employee.employeeId,
        role: employee.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      employee: {
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while logging in' });
  }
};

//Get Employee by ID
const getEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.status(200).json({
      employee: {
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching employee' });
  }
}
//Get All Employees 

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees || employees.length === 0) return res.status(404).json({ message: 'No employees found' });
    const employeeList = employees.map(emp => ({
      employeeId: emp.employeeId,
      name: emp.name,
      email: emp.email,
      role: emp.role
    }));
    res.status(200).json({ employees: employeeList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching employees' });
  }
};

// Update Employee  
const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { name, email, role } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Only allow updating role if current user is admin
    if (req.user.role !== 'admin' && role) {
      return res.status(403).json({ message: 'Only admin can change employee role' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.role = role || employee.role;

    await employee.save();

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: {
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating employee' });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getEmployee,
  updateEmployee,
  getAllEmployees
};


