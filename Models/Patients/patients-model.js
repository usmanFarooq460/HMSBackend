const mongoose = require("mongoose");

const patientsModelSchema = new mongoose.Schema({
    Name: {
        type: String
    },
});

const patientsModel = mongoose.model("patient", patientsModelSchema);
module.exports = patientsModel