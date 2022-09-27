const staffTypeModel = require("./../../Models/Staff/staff-type-model");
const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    allStaffTypes = await staffTypeModel.find()
    if (allStaffTypes) res.status(200).send(allStaffTypes);
    else res.status(200).send("something went wrong")
})

router.post("/addNew", async (req, res) => {
    console.log("staff type :", req.body)
    const newStaffType = new staffTypeModel(req.body);
    newStaffType.save().then(() => {
        res.status(201).send(newStaffType);
    }).catch((err) => {
        res.status(500).send(err);
        console.log("error: ", err);
    });
});

router.put("/update/:id", async (req, res) => {
    let updatedStaffType = await staffTypeModel.findByIdAndUpdate(req.params.id, req.body);
    if (updatedStaffType) {
        res.status(200).json({ success: true, message: updatedStaffType });
    } else res.status(500).json({ success: false, message: "staff Type Not Found" });
});

module.exports = router;