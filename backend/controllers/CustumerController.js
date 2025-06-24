const Custumer = require('../models/CustumersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Customer
const registerCustumer = async (req, res) => {
    try {
        const {
            name, email, password, status,
            fatherName, adhaarNo, panNo, dob, gender,
            phone, address, nominee, nomineeRelation,
            accountType, branchname, ifsc
        } = req.body;

        const existing = await Custumer.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Custumer already exists' });

        const lastCustumer = await Custumer.findOne().sort({ custumerId: -1 });
        const nextCustumerId = lastCustumer ? lastCustumer.custumerId + 1 : 1000;

        const lastAccount = await Custumer.findOne().sort({ accountno: -1 });
        const nextAccountNo = lastAccount ? lastAccount.accountno + 1 : 1400201;

        const hashedPassword = await bcrypt.hash(password, 10);
        const photo = req.files['photo'] ? req.files['photo'][0].path : '';
        const signature = req.files['signature'] ? req.files['signature'][0].path : '';


        const newCustumer = new Custumer({
            custumerId: nextCustumerId,
            name,
            email,
            password: hashedPassword,
            accountno: nextAccountNo,
            status: status || 'active',
            fatherName,
            adhaarNo,
            panNo,
            dob,
            gender,
            phone,
            address,
            nominee,
            nomineeRelation,
            accountType,
            branchname,
            ifsc,
            signature,
            photo
        });

        await newCustumer.save();

        res.status(201).json({
            message: 'Customer registered successfully',
            custumerId: newCustumer.custumerId,
            photoPath: newCustumer.photo,
            signaturePath: newCustumer.signature
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while registering customer' });
    }
};

// Customer Login
const loginCustumer = async (req, res) => {
    const { custumerId, password } = req.body;

    try {
        const custumer = await Custumer.findOne({ custumerId });
        if (!custumer) return res.status(404).json({ message: 'Custumer not found' });

        const isMatch = await bcrypt.compare(password, custumer.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

        const token = jwt.sign(
            {
                id: custumer._id,
                custumerId: custumer.custumerId,
                role: "customer"
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            customer: {
                custumerId: custumer.custumerId,
                name: custumer.name,
                email: custumer.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while logging in' });
    }
};

//get all customers
const getAllCustumers = async (req, res) => {
    try {
        const custumers = await Custumer.find();
        res.status(200).json({ custumers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching customers' });
    }
};
//get single customer
const getCustumerById = async (req, res) => {
    const { custumerId } = req.params;

    try {
        const custumer = await Custumer.findOne({ custumerId });
        if (!custumer) return res.status(404).json({ message: 'Custumer not found' });
        res.status(200).json({ custumer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching customer' });
    }
}
//get customer by account number
const getCustumerByAccountNo = async (req, res) => {
    const { accountno } = req.params;

    try {
        const custumer = await Custumer.findOne({ accountno });
        if (!custumer) return res.status(404).json({ message: 'Custumer not found' });
        res.status(200).json({ custumer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching customer by account number' });
    }
}

module.exports = {
    registerCustumer,
    loginCustumer,
    getAllCustumers,
    getCustumerById,
    getCustumerByAccountNo
};