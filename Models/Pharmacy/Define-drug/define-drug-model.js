const mongoose = require("mongoose");

const definingDrugSchema = new mongoose.Schema({
    drugName: {
        type: String,
        required: 'user name is required'
    },
    drugType: {
        type: String,
        required: 'user name is required'
    },
    drugCode: {
        type: String,
        unique: [true, "user name should be unique"],
        required: [true, 'UserName is required'],
    },
    drugFormulae: {
        type: String,
        required: [true, 'password is required'],
    },
    manufacturingDate:{
        type:Date,
        required:[true,'manufacturing date']
    },
    expiryDate:{
        type:Date,
        required:[true,'Expiry  date is required']
    },
    batchNo:{
        type:String,
        required:[true,'Batch No is Required']
    },
    retailPrice:{
        type:Number,
        required:[true,"retail price is required"]
    }
});

const defDrugsModel = mongoose.model('DefDrugs', definingDrugSchema)
module.exports = defDrugsModel;