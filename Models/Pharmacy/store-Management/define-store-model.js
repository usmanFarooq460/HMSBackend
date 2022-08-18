const mongoose = require("mongoose");

const defineStoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: [true, "Drug Type is required:"]
    },
    storeLocation: {
        type: String,
        required: [true, "Drug Type is required:"]
    },
    storeDescription: {
        type: String,
    }
});

const defineStoreModel = mongoose.model('defineStore', defineStoreSchema);
module.exports = defineStoreModel;