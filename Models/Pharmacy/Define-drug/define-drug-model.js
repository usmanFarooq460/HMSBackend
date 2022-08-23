const mongoose = require("mongoose");

const definingDrugSchema = new mongoose.Schema({
    drugName: {
        type: String,
        required: 'Drug name is required'
    },
    drugTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drugtypes',
        required: 'Drug Type is required'
    },
    drugCode: {
        type: String,
        // unique: [true, "user name should be unique"],
        required: [true, 'Drug Code is required'],
    },
    drugFormulae: {
        type: String,
        required: [true, 'Drug Formulae is required'],
    },
    manufacturingDate: {
        type: Date,
        required: [true, 'manufacturing date is required']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry  date is required']
    },
    batchNo: {
        type: String,
        required: [true, 'Batch No is Required']
    },
    retailPrice: {
        type: Number,
        required: [true, "retail price is required"]
    },
    ManufacturingPrice: {
        type: Number,
    },
    drugTypeName: {
        type: String,
        required: [true, "Drug Type is required"]
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
    }
});

const defDrugsModel = mongoose.model('DefDrugs', definingDrugSchema)
module.exports = defDrugsModel;