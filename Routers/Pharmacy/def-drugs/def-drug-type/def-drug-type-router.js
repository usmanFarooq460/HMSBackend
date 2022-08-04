const defDrugTypeModel = require('./../../../../Models/Pharmacy/Define-drug/define-drug-type/define-drug-type-model');
const express = require("express");
const { response } = require('express');
const router = express.Router();

router.get("/getAll", async (req, res) => {
    const defDrugTypes = await defDrugTypeModel.find().populate('userName');
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
        res.status(500).send(err); F
    });
});

module.exports = router;