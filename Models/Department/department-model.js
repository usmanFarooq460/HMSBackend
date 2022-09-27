const mongoose = require("mongoose");
const departmentModelSchema = new mongoose.Schema({
    DepartmentName: {
        type: String,
        required: [true, "Name is required"]
    },
    wardList: [
        { wardName: String },
    ]
});

const departmentModel = mongoose.model("department", departmentModelSchema);
module.exports = departmentModel