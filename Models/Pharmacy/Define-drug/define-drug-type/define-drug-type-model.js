const mongoose = require("mongoose");

const defDrugTypeSchema = new mongoose.Schema({
    drugType: {
        type: String,
        required: [true, "Drug Type is required:"]
    }
});

const defDrugTypeModel = mongoose.model('drugType', defDrugTypeSchema);
module.exports = defDrugTypeModel;