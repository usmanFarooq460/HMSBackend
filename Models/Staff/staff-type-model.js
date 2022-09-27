const mongoose = require("mongoose");

const StaffTypeModelSchema = new mongoose.Schema({
    staffType: {
        type: String,
        required: [true, "Staff Type is Required"]
    },
    descp: String
});

const staffTypeModel = mongoose.model("staffType", StaffTypeModelSchema);
module.exports = staffTypeModel 