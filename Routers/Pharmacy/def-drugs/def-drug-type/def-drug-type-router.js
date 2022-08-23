const defDrugTypeModel = require('./../../../../Models/Pharmacy/Define-drug/define-drug-type/define-drug-type-model');
const express = require("express");
const { response } = require('express');
const router = express.Router();

router.get("/getAll", async (req, res) => {
    const defDrugTypes = await defDrugTypeModel.find();
    if (defDrugTypes) {
        res.status(200).send(defDrugTypes)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post('/addNew', async (req, res) => {
    const newdrugType = new defDrugTypeModel(req.body);
     newdrugType.save().then(() => {
        res.status(201).send(newdrugType);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    let updateddrug = await defDrugTypeModel.findByIdAndUpdate(id, req.body)
    if (updateddrug) {
        res.status(200).send(updateddrug)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    let deleted = await defDrugTypeModel.findByIdAndRemove(id, req.body)
    if (deleted) {
        res.status(200).send(deleted)
    } else {
        res.status(500).json({ success: false, message: "Not Deleted" });
    }
});

module.exports = router;