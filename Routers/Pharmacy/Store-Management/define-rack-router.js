const defineRackModel = require("./../../../Models/Pharmacy/store-Management/define-rack-model")
const express = require("express");
const router = express.Router();

router.get("/getAll", async (req, res) => {
    let allRacks = await defineRackModel.find().populate('storeId');;
    if (allRacks) {
        res.status(200).send(allRacks);
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post("/addNew", async (req, res) => {
    console.log("body : ", req.body);
    const newRack = new defineRackModel(req.body);
    newRack.save().then(() => {
        res.status(200).send(newRack);
    }).catch((err) => res.status(500).send("Something Went Wrong"))
});

router.put("/update/:Id", async (req, res) => {
    console.log(req.params.Id);
    let updatedRack = await defineRackModel.findByIdAndUpdate(req.params.Id, req.body);
    if (updatedRack) {
        res.status(200).send(updatedRack);
    } else res.status(500).send("Something went wrong")
});

router.delete("/delete/:Id", async (req, res) => {
    let deleted = await defineRackModel.findByIdAndRemove(req.params.Id);
    if (deleted) res.status(200).send(deleted)
    else res.status(500).send("some thing went wrong");
});

router.get("/getRackByStoreId/:Id", async (req, res) => {
    if (req.params.Id == null) {
        res.status(500).send("id not found")
    }
    let allRacks = await defineRackModel.find();
    let filteredRecord = allRacks.filter(({ storeId }) => storeId == req.params.Id)
    if (filteredRecord) {
        res.status(200).send(filteredRecord);
    } else {
        res.status(500).send("Some thing went wrong")

    }

});

module.exports = router