const StoreModel = require("./../../../Models/Pharmacy/store-Management/add_item_In_store")
// const storeRecordModel = require("./../../../Models/Pharmacy/store-Management/add_item_In_store")
const express = require("express");
const router = express.Router();

router.get("/getAll", async (req, res) => {
    let allStoreMedicines = await StoreModel.find().populate({ path: 'storeId', model: 'defineStore' }).populate({ path: 'rackId', model: 'AllRack' })
        .populate({ path: 'medicineType', model: 'drugType' }).populate({ path: 'medicineId', model: 'DefDrugs' });
    console.log("medicines: ", allStoreMedicines);
    if (allStoreMedicines) { res.status(200).send(allStoreMedicines) }
    else { res.status(500).send("something went wrong") }
});

router.post('/addNew', async (req, res) => {
    console.log("requested body is : ", req.body);
    const newStoreRecord = new StoreModel(req.body);
    newStoreRecord.save().then(() => {
        res.status(200).send(newStoreRecord);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.put("update/:Id", async (req, res) => {
    let updatedStoreRecord = StoreModel.findOneAndUpdate(req.params.Id, req.body);
    if (updatedStoreRecord) res.status(200).send(updatedStoreRecord)
    else res.status(500).send("Some thing went wrong")
});

router.delete("delete/:Id", async (req, res) => {
    let deletedRecord = StoreModel.findByIdAndRemove(req.params.Id)
    if (deletedRecord) res.status(200).send(deletedRecord)
    else res.status(500).send("something went wrong");
});

router.get("getById/:Id", async (req, res) => {
    let dataById = await StoreModel.findById(req.params.Id)
    console.log("data by Id", dataById);
});

module.exports = router;