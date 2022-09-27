const saleInvoiceModel = require("./../../Models/Pharmacy/sale-invoice-model");
const stoeRecordsModel = require("./../../Models/Pharmacy/store-Management/add_item_In_store")
const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    let allSaleInvoices = await saleInvoiceModel.find();
    if (allSaleInvoices) res.status(200).send(allSaleInvoices)
    else res.status(500).send("some thing went wrong")
});

router.post("/addNew", async (req, res) => {
    const newSaleInvoice = new saleInvoiceModel(req.body);
    res.status(200).send(newSaleInvoice);
    newSaleInvoice
        .save()
        .then(async () => {
            let detail = []
            detail = req.body.InvoiceDetailList
            for (let i = 0; i < detail.length; i++) {
                await automateStoreData(detail[i].storeRecordId, detail[i].Qty)
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

async function automateStoreData(storeRecordId, qty) {
    let storeSingleData = await stoeRecordsModel.findById(storeRecordId);
    storeSingleData.qty = storeSingleData.qty - qty;
    const newStoreRecord = new stoeRecordsModel(storeSingleData);
    newStoreRecord
        .save()
        .then(() => {
            console.log("Updated Successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

router.put("/update/:Id", async (req, res) => {
    let detail = []
    detail = req.body.InvoiceDetailList
    for (let i = 0; i < detail.length; i++) {
        await automateStoreDataForUpdate(detail[i].storeRecordId, detail[i].Qty, detail[i].previousQtyInUpdateCase)
        detail[i].previousQtyInUpdateCase = detail[i].Qty;
    }
    req.body.InvoiceDetailList = detail;
    let updatedSaleInvoice = await saleInvoiceModel.findOneAndUpdate(req.params.Id, req.body);
    if (updatedSaleInvoice) res.status(200).send(updatedSaleInvoice);
    else res.status(500).send("Some thing went wrong");
});


async function automateStoreDataForUpdate(storeRecordId, qty, previous) {
    let storeSingleData = await stoeRecordsModel.findById(storeRecordId);
    storeSingleData.qty = storeSingleData.qty + previous - qty;
    const newStoreRecord = new stoeRecordsModel(storeSingleData);
    newStoreRecord
        .save()
        .then(() => {
            console.log("Updated Successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

router.delete("/delete/:Id", async (req, res) => {
    let deletedRecord = await saleInvoiceModel.findByIdAndRemove(req.params.Id);
    if (deletedRecord) res.status(200).send(deletedRecord);
    else res.status(500).send("something went wrong");
});

router.get("/getById/:Id", async (req, res) => {
    var object_id = new ObjectId(req.params.Id);
    const singleInvoiceData = await saleInvoiceModel.findOne({ _id: object_id })
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
    else res.status(500).send("Something went wrong");
});

module.exports = router;