const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://UsmanFarooq:03074324285@cluster0.9coy9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
// async function allUsersList(singleRecordsForAllusers) {
//     try {
//         await client.connect();
//         console.log("single user for all user: ", singleRecordsForAllusers);
//         DataForAllUsers = {
//             userName: singleRecordsForAllusers.userName,
//             role: "user",
//             CNIC_No: singleRecordsForAllusers.CNIC_No,
//             userNameForLogin: singleRecordsForAllusers.userNameForLogin,
//             passwordForLogin: singleRecordsForAllusers.passwordForLogin,
//         }
//         console.log("single user for addition: ", DataForAllUsers);
//         await addUserToDataBase(client, DataForAllUsers)
//         console.log("conect");
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function addUserToDataBase(client, newListing) {
//     const result = await client.db("HosspitalManagement").collection("allusers").insertOne(newListing);
//     console.log("new record added : ", result);
// }

const UserModel = require('../../Models/Accounts/userAcounts');
const express = require("express");
const { response } = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get("/getAll", async (req, res) => {
    const users = await UserModel.find().catch('error found ');
    console.log("user list : ", users);
    if (users) {
        res.status(200).send(users);
    } else {
        res.status(500).send("something went wrong");
    }
});

router.get("/getById/:Id", async (req, res) => {
    var good_id = new ObjectId(req.params.Id);
    const singleUser = await UserModel.findOne({ _id: good_id }).catch(err => console.log(err))
    console.log("single user : ", singleUser);
    if (singleUser) {
        res.status(200).send(singleUser)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post("/AddNew", async (req, res) => {
    const userList = await UserModel.find().catch('error found ');
    console.log("users list : ", userList);
    const newUser = new UserModel(req.body);
    newUser.save().then(() => {
        res.status(201).send(newUser);
        // allUsersList(newUser).catch(console.error);
    }).catch((err) => {
        res.status(500).send(err);
        console.log("error: ", err);
    });
});

router.put("/update/:Id", async (req, res) => {
    console.log("req.params.Id", req.params.Id);
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.Id, req.body);
    if (updatedUser) {
        return res.status(200).json({ success: true, message: "user has updated: " });
    } else {
        return res.status(500).json({ success: false, message: "User Not Found: " });
    }
})

router.delete("/delete/:Id", async (req, res) => {
    UserModel.findByIdAndRemove(req.params.Id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: "user has deleted: " });
        } else {
            return res.status(500).json({ success: false, message: "User Not Found: " });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, message: err })
    })
});

module.exports = router;

