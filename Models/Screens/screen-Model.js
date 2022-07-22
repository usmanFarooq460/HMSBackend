const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
    ModuleName: {
        type: String,
        unique: [true, "user name should be unique"],
        required: [true, 'Module is required'],
    }
});

const screenModel = mongoose.model('screen', screenSchema)
module.exports = screenModel;