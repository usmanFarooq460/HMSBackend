const ScreenModel = require('../../Models/Screens/screen-Model');
const express = require("express");
const router = express.Router();


router.get("/getAll", async (req, res) => {
    const screens = await ScreenModel.find().catch('error found ');
    console.log("All Screens: ", screens);
    if (screens) {
        res.status(200).send(screens)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post("/AddNew", async (req, res) => {
    const screenList = await ScreenModel.find().catch('error found ');
    console.log("Screnn list list : ", screenList);
    const newScreen = new ScreenModel(req.body);
    newScreen.save().then(() => {
        res.status(201).send(newScreen);
    }).catch((err) => {
        res.status(500).send(err);
        console.log("error: ", err);
    });
});

router.put("/update/:Id", async (req, res) => {
    console.log("req.params.Id", req.params.Id);
    const updatedScreen = await ScreenModel.findByIdAndUpdate(req.params.Id, req.body);
    if (updatedScreen) {
        return res.status(200).json({ success: true, message: "screen has updated: " });
    } else {
        return res.status(500).json({ success: false, message: "screen Not Found: " });
    }
});


router.delete("/delete/:Id", async (req, res) => {
    ScreenModel.findByIdAndRemove(req.params.Id)
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, message: "screen has deleted: " });
            } else {
                return res.status(500).json({ success: false, message: "screen Not Found: " });
            }
        }).catch(err => {
            return res.status(500).json({ success: false, message: err })
        })
});

module.exports = router;