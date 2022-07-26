const mongoose = require("mongoose");

const screenRightsSchema = new mongoose.Schema({
    screenNames: [
        {
            Id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'screen'
            },
            name: String,
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Screen names are required or id is wrong']
    },
    userName: {
        type: String
    }
});

const screenRightsModel = mongoose.model('screenRight', screenRightsSchema);
module.exports = screenRightsModel;