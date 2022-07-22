// const mongoose = require("mongoose");

// const allUserSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//         required: [true, 'UserName is required'],
//     },
//     role: {
//         type: String,
//         required: [true, 'Role is Required']
//     },
//     CNIC_No: {
//         type: String,
//         required: [true, 'password is required'],
//     },
//     userNameForLogin: {
//         type: String,
//         unique: [true, "user name should be unique"],
//         required: [true, 'UserName is required'],
//     },
//     passwordForLogin: {
//         type: String,
//         required: [true, 'password is required'],
//     },
// });

// const allUserModel = mongoose.model('allUser', allUserSchema)
// module.exports = allUserModel;