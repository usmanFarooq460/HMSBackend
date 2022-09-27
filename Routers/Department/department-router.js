const DepartmentModel = require("./../../Models/Department/department-model");
const express = require("express");
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    allDepartments = await DepartmentModel.find()
    if (allDepartments) res.status(200).send(allDepartments);
    else res.status(200).send("something went wrong")
})

router.post("/addNew", async (req, res) => {
    console.log("data for save : ", req.body);
    const newDeparmtent = new DepartmentModel(req.body);
    newDeparmtent.save().then(() => {
        res.status(201).send(newDeparmtent);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.put("/update/:id", async (req, res) => {
    let updatedDepartment = await DepartmentModel.findByIdAndUpdate(req.params.id, req.body);
    if (updatedDepartment) {
        res.status(200).json({ success: true, message: updatedDepartment });
    } else res.status(500).json({ success: false, message: "staff Type Not Found" });
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    let deleted = await DepartmentModel.findByIdAndRemove(id)
    if (deleted) res.status(200).send(deleted)
    else res.status(500).json({ success: false, message: "Not Deleted" });
});

module.exports = router;