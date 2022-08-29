const StoreModel = require("./../../../Models/Pharmacy/store-Management/add_item_In_store");
const defineStoreModel = require("./../../../Models/Pharmacy/store-Management/define-store-model");
const defineRackModel = require("./../../../Models/Pharmacy/store-Management/define-rack-model");
const defineMedicineType = require("./../../../Models/Pharmacy/Define-drug/define-drug-type/define-drug-type-model");
const defineMedicineModel = require("./../../../Models/Pharmacy/Define-drug/define-drug-model");
const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
  let historyObj
  let allStoreMedicines = [];

  allStoreMedicines = await StoreModel.find();
  let finalArrayforStore = [];

  for (const item of allStoreMedicines) {
    let storeObject = await defineStoreModel.findById(item.storeId);
    let rackObject = await defineRackModel.findById(item.rackId);
    let medicineTypesObject = await defineMedicineType.findById(
      item.medicineType
    );
    let medicineObject = await defineMedicineModel.findById(item.medicineId);
    historyObj = {
      _id: item._id,
      storeName: storeObject.storeName,
      RackName: rackObject.rackName,
      medicineType: medicineTypesObject.drugType,
      medicineName: medicineObject.drugName,
      manufacturingDate: medicineObject.manufacturingDate,
      expiryDate: medicineObject.expiryDate,
      batchNo: medicineObject.batchNo,
      retailPrice: medicineObject.retailPrice,
      size: item.size,
      qty: item.qty,
      remarks: item.remarks
    }
    finalArrayforStore.push(historyObj);
  }
  console.log("getting all");
  if (finalArrayforStore?.length) {
    res.status(200).send(finalArrayforStore);
  } else {
    res.status(500).send("something went wrong");
  }
});

// router.get("/getAll", async (req, res) => {
//   let allStoreMedicines = await StoreModel.find()
//     .populate({ path: "storeId", model: "defineStore" })
//     .populate({ path: "rackId", model: "AllRack" })
//     .populate({ path: "medicineType", model: "drugType" })
//     .populate({ path: "medicineId", model: "DefDrugs" });
//   console.log("medicines: ", allStoreMedicines);
//   if (allStoreMedicines) {
//     res.status(200).send(allStoreMedicines);
//   } else {
//     res.status(500).send("something went wrong");
//   }
// });

router.post("/addNew", async (req, res) => {
  console.log("requested body is : ", req.body);
  const newStoreRecord = new StoreModel(req.body);
  newStoreRecord
    .save()
    .then(() => {
      res.status(200).send(newStoreRecord);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put("/update/:Id", async (req, res) => {
  let updatedStoreRecord = await StoreModel.findOneAndUpdate(req.params.Id, req.body);
  if (updatedStoreRecord) res.status(200).send(updatedStoreRecord);
  else res.status(500).send("Some thing went wrong");
});

router.delete("/delete/:Id", async (req, res) => {
  let deletedRecord =await StoreModel.findByIdAndRemove(req.params.Id);
  if (deletedRecord) res.status(200).send(deletedRecord);
  else res.status(500).send("something went wrong");
});

router.get("/getById/:Id", async (req, res) => {
  var good_id = new ObjectId(req.params.Id);
  const singleStoreData = await StoreModel.findOne({ _id: good_id })
  console.log("single user : ", singleStoreData);
  if (singleStoreData) {
    res.status(200).send(singleStoreData)
  } else {
    res.status(500).send("something went wrong")
  }
});

module.exports = router;
