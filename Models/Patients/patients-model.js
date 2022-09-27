const mongoose = require("mongoose");

const patientsModelSchema = new mongoose.Schema({
    // Personal Information
    Name: {
        type: String,
        required: [true, "Name is required"]
    },
    fatherName: {
        type: String,
        required: [true, "Father name is Required"]
    },
    Age: {
        type: Number,
        required: [true, "Age is required"]
    },
    CNIC_No: {
        type: String,
        required: [true, "CNIC no is required"]
    },//Check previous data with Id 
    City: {
        type: String,
        required: [true,"City is required"]
    },
    contactNo: {
        type: String,
        required: [true, "Contact No is required"]
    },
    MaritalStatus: String,
    Gender: String,
    Address: String,
});

const patientsModel = mongoose.model("patient", patientsModelSchema);
module.exports = patientsModel


//*************** */ Department Detail

// DepartmentName:String,

// DepartmentRoomList[]
// Rooms:String{
    // Doctors:String;
    // },
    
// ************************ ApointMent Detail ********************//
    // Desease Information
    // BloodGroup: String,
    // DeseaseType: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "deseaseType",
    //     required: [true, "staff Type is Required"]
    // },
    // DeseaseDescription: String,