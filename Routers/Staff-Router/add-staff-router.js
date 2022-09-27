const staffModel = require("./../../Models/Staff/staff-members-model");
const express = require("express");
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    allStaffs = await staffModel.find().populate({ path: "staffType", model: "staffType" })
    if (allStaffs) res.status(200).send(allStaffs);
    else res.status(200).send("something went wrong")
})

router.post("/addNew", async (req, res) => {
    const newStaff = new staffModel(req.body);
    newStaff.save().then(() => {
        res.status(201).send(newStaff);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.put("/update/:id", async (req, res) => {
    let updatedStaffType = await staffModel.findByIdAndUpdate(req.params.id, req.body);
    if (updatedStaffType) {
        res.status(200).json({ success: true, message: updatedStaffType });
    } else res.status(500).json({ success: false, message: "staff Type Not Found" });
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    let deleted = await staffModel.findByIdAndRemove(id)
    if (deleted) res.status(200).send(deleted)
    else res.status(500).json({ success: false, message: "Not Deleted" });
});

module.exports = router;