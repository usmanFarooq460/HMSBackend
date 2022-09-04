const defDrugModel = require('./../../../Models/Pharmacy/Define-drug/define-drug-model');
const storeRecordModel = require("./../../../Models/Pharmacy/store-Management/add_item_In_store")
const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

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
    let Id = req.params.Id
    console.log("body: ", req.body, "id:", Id);
    const updatedDrug = await defDrugModel.findByIdAndUpdate(Id, req.body);
    if (updatedDrug) {
        res.status(200).send(updatedDrug)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.delete("/delete/:Id", async (req, res) => {
    let storeRecord = []
    storeRecord = await storeRecordModel.find();
    console.log("what is in store: ", storeRecord);
    var object_id = new ObjectId(req.params.Id);
    let medicineFound = storeRecord.find(({ medicineId }) => medicineId == object_id)
    console.log("medicine found in store ", medicineFound);
    for (let i = 0; i < storeRecord.length; i++) {
        if (object_id == storeRecord[i].medicineId) {
            console.log("Id has been refered in stored");
            res.status(500).send("Item found in store So you cannot delete it, If you Desperately want to delete this Medicine then go to store and delete it then come back here and delete this medicine  ")
            return;
        }
    }
    storeRecord?.map((item) => {
        console.log("store medicine Id: ", item.medicineId, "param Id: ", object_id);
    })
    // await defDrugModel.findByIdAndRemove(req.params.Id).then(defDrug => {
    //     if (defDrug) {
    //         return res.status(200).json({ success: true, message: "user has deleted: " });
    //     } else {
    //         return res.status(500).json({ success: false, message: "User Not Found: " });
    //     }
    // }).catch(err => {
    //     return res.status(500).json({ success: false, message: "error in deleting use" + err })
    // })
});

module.exports = router;