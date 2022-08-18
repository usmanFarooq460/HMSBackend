const screenRightsModel = require('../../../Models/screen-rights/screen-rights/screen-rights-model');
const express = require("express");
const UserModel = require('./../../../Models/Accounts/userAcounts');
const router = express.Router();


router.get("/getAll", async (req, res) => {
    const screensRights = await screenRightsModel.find().populate('userName');
    if (screensRights) {
        res.status(200).send(screensRights)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post('/addNew', async (req, res) => {
    console.log("adding new screen right", req.body);
    const newScreenRight = new screenRightsModel(req.body);
    newScreenRight.save().then(() => {
        res.status(201).send(newScreenRight);
    }).catch((err) => {
        res.status(500).send(err);
    });
});



router.put('/update/:id', async (req, resp) => {
    const updatedRights = await screenRightsModel.findByIdAndUpdate(req.params.id, req.body);
    if (updatedRights) {
        return resp.status(200).json({ success: true, message: "User Rights has updated: " });
    } else {
        return resp.status(500).json({ success: false, message: "Rights  Not Found: " });
    }
});

router.get('/getRightsByUserId/:id', async (req, res) => {
    let userId = req.params.id;
    if (userId == undefined || userId == null) {
        return res.status(500).json({ success: false, message: "id not found" });
    }
    const singleUser = await UserModel.findOne({ _id: userId }).catch(err => console.log(err));
    let listOfAllRightsList = [];
    listOfAllRightsList = await screenRightsModel.find();
    if (listOfAllRightsList?.length > 0 && singleUser) {
        console.log(gettingRightsList(req.params.id, listOfAllRightsList));
        res.status(200).send(gettingRightsList(req.params.id, listOfAllRightsList))
    } else if (singleUser) {
        res.status(200).send([]);
    }
    else {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

function gettingRightsList(id, listOfRights) {
    let matchedList = {}
    for (let i = 0; i < listOfRights.length; i++) {
        if (listOfRights[i].userId == id) {
            console.log("user found with some rights");
            matchedList = listOfRights[i];
        }
    }
    return matchedList
}

module.exports = router;