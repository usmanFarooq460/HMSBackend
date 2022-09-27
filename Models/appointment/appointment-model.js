const mongoose = require("mongoose");
const appointmentModelSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: [true, "Patient is required"]
    },
    doctor: {
        type: String,
        required: [true, "Patient is required"]
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        required: [true, "department is required"]
    },
    ward: String,
    reason: String,
    appointmentDate: Date
});

const appointmentModel = mongoose.model("appointment", appointmentModelSchema);
module.exports = appointmentModel