const env = require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const header = require("./header/header");
const newUser = require("./controller/studentSign");
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
//app.use(StuValidate);
//student log
app.use("/student",studentLog);


//advisor log
app.use("/advLog",advisorLog);  

// switch(true){
//     case (app.use("/student",studentLog)):
//         //student log
//         app.use(StuValidate);
//         app.use("/student",studentLog);
//         break;
//     case (app.use("/advLog",advisorLog)):
//         //advisor validating
//         app.use(require("./header/advisorValidation"));
//         //advisor log
//         app.use("/advLog",advisorLog);  
//         break;
// }


//const AdvValidate = require("./header/advisorValidation");

app.listen(process.env.PORT,()=>{
    console.log(`Listening to ${process.env.PORT}`)
})



