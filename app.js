
const { response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

// MiddleWares
app.use(express.json());
// app.use(morgan('tiny'));

//Cors
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// ............. Listening on browser .......................
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("running on port 3000");
});

app.get("/", (req, res) => {
    res.send("Hoopital Apis Working");
});

// data base connection===============
function connectMongoos() {
    mongoose
        .connect(
            // "mongodb+srv://UsmanFarooq:03074324285@cluster0.9coy9.mongodb.net/HosspitalManagement?retryWrites=true&w=majority"
            "mongodb://127.0.0.1:27017/Hospital_Management"
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

const defStore = require('./Routers/Pharmacy/Store-Management/define-store')
app.use('/def_Store', defStore)

const defRack = require("./Routers/Pharmacy/Store-Management/define-rack-router")
app.use('/def_rack', defRack)

const AddRecordToStore = require("./Routers/Pharmacy/Store-Management/add_itme_in_store_router")
app.use('/add_Record_in_store', AddRecordToStore)
