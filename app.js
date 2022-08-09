
const { response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// MiddleWares
app.use(express.json());

//Cors
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


var server_port = 3000;
var server_host = '0.0.0.0';
app.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});

// app.listen(() => {
//     console.log("running on port 3000");
// });

// data base connection===============


function connectMongoos() {
    mongoose
        .connect(
            "mongodb+srv://UsmanFarooq:03074324285@cluster0.9coy9.mongodb.net/HosspitalManagement?retryWrites=true&w=majority"
            // "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1"
            // "mongodb://127.0.0.1:27017/Hospital_Management"
        )
        .then(() => {
            console.log("Data Base connected");
        })
        .catch((err) => {
            console.log("not connected");
        });
}
connectMongoos()
// ============Data base Connection==========


//routers
const adminRouter = require('./Routers/Accounts/admin');
app.use('/admin', adminRouter);

const userRouter = require('./Routers/Accounts/user');
app.use('/user', userRouter);

// const allUsersRouter = require('./Routers/Accounts/all-users-router');
// app.use('/allUsers', allUsersRouter);

//Screen Rights
const screensRouter = require('./Routers/screen-rights/Screens/screen-Router');
app.use('/screens', screensRouter);

const screensRightsRouter = require('./Routers/screen-rights/screen-rights/screen-rights-router');
app.use('/screens-rights', screensRightsRouter);

// Pharmacy managment******************************************************
const defDrugTypeRouter = require('./Routers/Pharmacy/def-drugs/def-drug-type/def-drug-type-router')
app.use('/def-drugType', defDrugTypeRouter)

const defDrugRouter = require('./Routers/Pharmacy/def-drugs/def-drugs-router')
app.use('/def_drug', defDrugRouter)
