const mongoose = require("mongoose");

const StaffMembersModelSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    staffType: {
        type: String
    }
});

const staffModel = mongoose.model("staff", StaffMembersModelSchema);
module.exports = staffModel 