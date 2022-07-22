// const connect = require("./../../app")
// const alluserModel = require("./../../Models/all-users/all-users")
// const express = require("express");
// const router = express.Router();

// router.get("/getAll", async (req, res) => {
//     const Allusers = await alluserModel.find().catch('error found ');
//     console.log("All user list : ", Allusers);
//     if (Allusers) {
//         res.status(200).send(Allusers)
//     } else {
//         res.status(500).send("something went wrong")
//         connect.connectMongoos();
//     }
// });

// module.exports = router;