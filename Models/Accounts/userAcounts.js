const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: 'user name is required'
    },
    userNameForLogin: {
        type: String,
        unique: [true, "user name should be unique"],
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
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: String,
    }
});

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;