const mongoose = require("mongoose");

const defineStoreNameSchema = new mongoose.Schema({
    drugType: {
        type: String,
        required: [true, "Drug Type is required:"]
    }
});

const defineStoreModel = mongoose.model('defineStore', defineStoreSchema);
module.exports = defDrugTypeModel;