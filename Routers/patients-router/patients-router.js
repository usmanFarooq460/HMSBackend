const patientsModel = require("./../../Models/Patients/patients-model");
const express = require("express");
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    allPatients = await patientsModel.find()
    if (allPatients) res.status(200).send(allPatients);
    else res.status(200).send("something went wrong")
})

router.post("/addNew", async (req, res) => {
    const newPatient = new patientsModel(req.body);
    newPatient.save().then(() => {
        res.status(201).send(newPatient);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.put("/update/:id", async (req, res) => {
    let updatedPatient = await patientsModel.findByIdAndUpdate(req.params.id, req.body);
    if (updatedPatient) {
        res.status(200).json({ success: true, message: updatedPatient });
    } else res.status(500).json({ success: false, message: "something went wrong" });
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    let deleted = await patientsModel.findByIdAndRemove(id)
    if (deleted) res.status(200).send(deleted)
    else res.status(500).json({ success: false, message: "Not Deleted" });
});

module.exports = router;