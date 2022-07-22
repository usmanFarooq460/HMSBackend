// const { MongoClient } = require('mongodb');
// async function main(newAdminData) {
//     const uri = "mongodb+srv://UsmanFarooq:03074324285@cluster0.9coy9.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         let singleRecordsForAddingInAllusers = {
//             userName: newAdminData.AdminName,
//             role: 'Admin',
//             CNIC_No: newAdminData.CNIC_No,
//             userNameForLogin: newAdminData.userNameForLogin,
//             passwordForLogin: newAdminData.passwordForLogin,
//         }
//         await addUserToDataBase(client, singleRecordsForAddingInAllusers);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function addUserToDataBase(client, newListing) {
//     const result = await client.db("HosspitalManagement").collection("allusers").insertOne(newListing);
// }


const Admin = require('../../Models/Accounts/admin');
const express = require("express");
const app = express();
const router = express.Router();

router.get("/getAll", async (req, res) => {
    const admin = await Admin.find().catch('error found ');
    console.log("what is user list : ", admin?.length);
    if (admin) {
        res.status(200).send(admin)
    } else {
        res.status(500).send("something went wrong")
    }
});

router.post("/AddNew", async (req, res) => {
    const adminList = await Admin.find().catch('error found ');
    if (adminList.length > 0 == false) {
        const newAdmin = new Admin(req.body);
        newAdmin.save().then(() => {
            res.status(201).send(newAdmin);
            // main(newAdmin).catch(console.error);
        }).catch((err) => {
            res.status(500).send(err);
        });
    }
    else {
        res.status(500).send("Admin Found! You can Only Update it");
    }
});

module.exports = router;