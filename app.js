
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

app.listen(3000, () => {
    console.log("running on port 3000");
});

// data base connection===============
function connectMongoos() {
    mongoose
        .connect(
            "mongodb+srv://UsmanFarooq:03074324285@cluster0.9coy9.mongodb.net/HosspitalManagement?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("Data Base connected");
        })
        .catch((err) => {
            console.log("not connected");
        });
}
// ============Data base Connection==========


//routers
const adminRouter = require('./Routers/Accounts/admin');
app.use('/admin', adminRouter);

const userRouter = require('./Routers/Accounts/user');
app.use('/user', userRouter);

// const allUsersRouter = require('./Routers/Accounts/all-users-router');
// app.use('/allUsers', allUsersRouter);

const screensRouter = require('./Routers/screen-rights/Screens/screen-Router');
app.use('/screens', screensRouter);

module.exports = connectMongoos();
