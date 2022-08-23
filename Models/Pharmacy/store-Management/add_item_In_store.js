const mongoose = require("mongoose");

const addMedicinesInStoreSchema = new mongoose.Schema({
    recordNo: {
        type: Number
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'definestores',
        required: [true, "store Id is required"]
    },
    rackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AllRack",
        required: [true, "Rack is required"]
    },
    medicineType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "drugType",
        required: [true, "Medicine Type is required"]
    },
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "drugType",
        required: [true, "Medicine Type is required"]
    },
    qty: {
        type: Number,
        required: [true, 'Qty is required']
    },
    size: {
        type: String
    }
})

const addMedicinesInStoreModel = mongoose.model("ItemsInStore", addMedicinesInStoreSchema);
module.exports = addMedicinesInStoreModel
