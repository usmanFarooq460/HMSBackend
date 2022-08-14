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

router.put('/update/:Id', async (req, res) => {
    let id = req.body.params;
    const newdrug = new defDrugModel(id, req.body);
    newdrug.save().then(() => {
        res.status(200).send(newdrug);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.delete("/delete/:Id", async (req, res) => {
    defDrugModel.findByIdAndRemove(req.params.Id).then(defDrug => {
        if (defDrug) {
            return res.status(200).json({ success: true, message: "user has deleted: " });
        } else {
            return res.status(500).json({ success: false, message: "User Not Found: " });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, message: "error in deleting use" + err })
    })
});

module.exports = router;