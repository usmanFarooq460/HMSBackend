const defStoreModel = require('./../../../Models/Pharmacy/store-Management/define-store-model')
const express = require("express");
const router = express.Router();

router.get("/getAll", async (req, res) => {
    const defStore = await defStoreModel.find();
    if (defStore) {
        res.status(200).send(defStore)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post('/addNew', async (req, res) => {
    console.log("body : ",req.body);
    const newStore = new defStoreModel(req.body);
    newStore.save().then(() => {
        res.status(201).send(newStore);
    }).catch((err) => {
        res.status(500).send("An Error has beeb occured",err);
    });
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    let updatedStore = await defStoreModel.findByIdAndUpdate(id, req.body)
    if (updatedStore) {
        res.status(200).send(updatedStore)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    let deleted = await defStoreModel.findByIdAndRemove(id, req.body)
    if (deleted) {
        res.status(200).send(deleted)
    } else {
        res.status(500).json({ success: false, message: "Not Deleted" });
    }
});

module.exports = router;