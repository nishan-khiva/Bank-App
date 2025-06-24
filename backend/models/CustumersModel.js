const mongoose = require('mongoose');

const custumerSchema = new mongoose.Schema({

  // Identification & Login
  custumerId: {
    type: Number,
    unique: true
  },
  accountno: {
    type: Number,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },

  // Personal Details
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  adhaarNo: {
    type: String,
    unique: true,
  },
  panNo: {
    type: String,
    unique: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },

  // Contact Details
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },

  // Nominee Details
  nominee: {
    type: String,
  },
  nomineeRelation: {
    type: String,
  },

  //Account Details
  accountType: {
    type: String,
    enum: ['savings', 'current'],
    default: 'savings',
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'suspended']
  },
  avlbalance: {
    type: Number,
    required: true,
    default: 0,
  },

  // Branch Info
  branchname: {
    type: String,
    default: "Rudrapur"
  },
  ifsc: {
    type: String,
    default: "SBIN0000001"
  },

  // Uploaded Files
  signature: {
    type: String, // base64 string or URL
  },
  photo: {
    type: String, // base64 string or URL
  }
}, { timestamps: true })



const Custumer = mongoose.model('Custumer', custumerSchema);
module.exports = Custumer;
