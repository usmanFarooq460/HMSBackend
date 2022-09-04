const saleInvoiceModel = require("./../../Models/Pharmacy/sale-invoice-model");
const stoeRecordsModel = require("./../../Models/Pharmacy/store-Management/add_item_In_store")
const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    let allSaleInvoices = await saleInvoiceModel.find();
    if (allSaleInvoices) res.status(500).send(allSaleInvoices)
    else res.status(500).send("some thing went wrong")
});

router.post("/addNew", async (req, res) => {
    const newSaleInvoice = new saleInvoiceModel(req.body);
    newSaleInvoice
        .save()
        .then(() => {
            res.status(200).send(newSaleInvoice);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.put("/update/:Id", async (req, res) => {
    let updatedSaleInvoice = await saleInvoiceModel.findOneAndUpdate(req.params.Id, req.body);
    if (updatedSaleInvoice) res.status(200).send(updatedSaleInvoice);
    else res.status(500).send("Some thing went wrong");
});

router.delete("/delete/:Id", async (req, res) => {
    let deletedRecord = await saleInvoiceModel.findByIdAndRemove(req.params.Id);
    if (deletedRecord) res.status(200).send(deletedRecord);
    else res.status(500).send("something went wrong");
});

router.get("/getById/:Id", async (req, res) => {
    var good_id = new ObjectId(req.params.Id);
    const singleInvoiceData = await saleInvoiceModel.findOne({ _id: good_id })
    console.log("single user : ", singleInvoiceData);
    if (singleInvoiceData) {
        res.status(200).send(singleInvoiceData)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.get("/getStoreMedicinesByStoreId/:Id", async (req, res) => {
    var good_id = new ObjectId(req.params.Id);
    let allStore = await stoeRecordsModel.find({ storeId: good_id }).populate({ path: "medicineId", model: "DefDrugs" });
    if (allStore) res.status(200).send(allStore);
    else res.status(500).send("Something went wrong")
})

module.exports = router;