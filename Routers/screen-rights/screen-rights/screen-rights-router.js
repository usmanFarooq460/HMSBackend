const screenRightsModel = require('../../../Models/screen-rights/screen-rights/screen-rights-model');
const express = require("express");
const router = express.Router();


router.get("/getAll", async (req, res) => {
    const screensRights = await screenRightsModel.find().populate('userName');
    console.log("All Screens: ", screensRights);
    if (screensRights) {
        res.status(200).send(screensRights)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post('/addNew', async (req, res) => {
    const screenRights = await screenRightsModel.find().catch(err => console.log("Screen rights"));
    const newScreenRight = new screenRightsModel(req.body);
    console.log("Adding New");
    newScreenRight.save().then(() => {
        res.status(201).send(newScreenRight);
    }).catch((err) => {
        res.status(500).send(err);
        console.log("error: ", err);
    });
});


module.exports = router;