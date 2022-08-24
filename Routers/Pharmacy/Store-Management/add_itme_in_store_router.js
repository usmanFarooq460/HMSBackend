const StoreModel = require("./../../../Models/Pharmacy/store-Management/add_item_In_store")
const express = require("express");
const router = express.Router();

router.get("/getAll", async (req, res) => {
    let allStoreMedicines = await StoreModel.find().populate({ path: 'storeId', populate: { path: 'rackId' } });
    console.log("medicines: ", allStoreMedicines)
    // Agenda.find().                                    //Collection 1
    //     populate({path:'proid',                       //Collection 2
    //     populate:{path:'userid',                      //Collection 3
    //     populate:{path:'otherFiel', model: Collection //Collection 4 and more
    //     }}})
    // .exec();
    if (allStoreMedicines) { res.status(200).send(allStoreMedicines) }
    else { res.status(500).send("something went wrong") }
});

router.post("/addNew", async (req, res) => {
    let addingNewMedicine = new StoreModel(req.body)
    if (addingNewMedicine) { res.status(200).send(addingNewMedicine) }
    else res.status(500).send("Something went wrong")
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