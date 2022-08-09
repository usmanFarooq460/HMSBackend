const defDrugModel = require('./../../../Models/Pharmacy/Define-drug/define-drug-model');
const express = require("express");
const { response } = require('express');
const router = express.Router();

router.get("/getAll", async (req, res) => {
    const defDrug = await defDrugModel.find();
    if (defDrug) {
        res.status(200).send(defDrug)
    } else {
        res.status(500).send("something went wrong")
    }
});


router.post('/addNew', async (req, res) => {
    const newdrug = new defDrugModel(req.body);
    newdrug.save().then(() => {
        res.status(200).send(newdrug);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

module.exports = router;