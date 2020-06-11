const env = require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const header = require("./header/header");
const newUser = require("./controller/studentSign");
const AdvValidate = require("./header/advisorValidation");
const StuValidate = require("./header/studentValidation");
const studentLog = require("./controller/studentLog");
const advisorLog = require("./controller/advisorLog");
//const normalLog = require("./controller/log");


//creating the databse.
sequelize.sync();

//accepting user input
app.use(express.json());

//cor
app.use(header);

app.use("/user",newUser);

// //checking username
// app.use("/username",normalLog);


//validating
app.use(StuValidate);
//student log
app.use("/student",studentLog);



//advisor validating
app.use(AdvValidate);
//advisor log
app.use("/advLog",advisorLog);  



app.listen(process.env.PORT,()=>{
    console.log(`Listening to ${process.env.PORT}`)
})



