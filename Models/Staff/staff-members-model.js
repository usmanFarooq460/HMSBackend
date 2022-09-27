const mongoose = require("mongoose");

const StaffMembersModelSchema = new mongoose.Schema({
    staffType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staffType",
        required: [true, "staff Type is Required"]
    },
    Name: {
        type: String,
        required: [true, "Name is Required"]
    },
    PhoneNo: {
        type: String,
        required: [true, "Phone number is Required"]
    },
    Designation: {
        type: String,
        required: [true, "Designation is Required"]
    },
    Salary: {
        type: Number,
        required: [true, "Salary is Required"]
    },
    Address: String,
    Description: String,
});

const staffModel = mongoose.model("staff", StaffMembersModelSchema);
module.exports = staffModel 