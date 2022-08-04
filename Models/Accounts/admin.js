const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    AdminName: {
        type: String,
        required: 'admin name is required'
    },
    phoneNumber: {
        type: String,
    },
    Address: {
        type: String,
    },
    HospitalName: {
        type: String,
        required: "hospotal name is required"
    },
    userNameForLogin: {
        type: String,
        required: [true, 'UserName is required'],
    },
    passwordForLogin: {
        type: String,
        required: [true, 'password is required'],
    },
    CNIC_No: {
        type: String,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        default: 'Admin'
    },
    createdAt: {
        default: Date.now,
        type: Date,
        required: [true, 'created Date is required']
    }
});

const AdminModel = mongoose.model('Admin', adminSchema)
module.exports = AdminModel;