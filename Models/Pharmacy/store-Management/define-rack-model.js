const mongoose = require("mongoose");

const defineRackModelSchema = new mongoose.Schema({
    rackName: {
        type: String,
        required: [true, "Rack name is Required"]
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "defineStore",
        required: [true, "rack is Required"]
    },
    Description: { type: String },
    StoreName:{type:String}
});

const defineRackmodel = mongoose.model("AllRack", defineRackModelSchema);
module.exports = defineRackmodel;
