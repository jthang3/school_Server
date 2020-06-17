const express = require("express");
const route = express.Router();
const table = require("../db").import("../module/student");
const advisor = require("../db").import("../module/advisor");
const classes = require("../db").import("../module/class");
const StuValidate = require("../header/studentValidation");

//route.use(StuValidate);  test this. or route.get("/info",StuValidate,(req,res)=> to validate
//getting all the info aka - homepage for student
route.use(StuValidate);
route.get("/info",StuValidate,(req,res)=>{
    table.findAll({
        where:{
            owner_id: req.user.id
        }
    })
    .then(data=>{
        res.status(200).json({
            data: data
        })
    },(err)=>{
        res.send(err.message)
    })
    .catch(console.log)
})

//posting
var advisorId; //this variable will hold the advisor id to get the advisor table.
route.post("/studentInfo",(req,res)=>{
    const data = {
        FirstName: req.body.user.firstName,
        LastName: req.body.user.lastName,
        //selection
        Major: req.body.user.major,
        DOB: req.body.user.dob,
        owner_id: req.user.id,
        //selection
        advID: req.body.user.adv,
        classId: req.body.user.classId
    }
    advisorId = data.advID;
    table.create(data)
    .then(data=>{
        res.status(200).json({
            data: data,
            message: "Successfully created!"
        })
    })
    .catch(console.log)
    
})

//updating a student
route.put("/:id",(req,res)=>{
    let id = req.param.id;
    const data = {
        FirstName: req.body.user.firstName,
        LastName: req.body.user.lastName,
        Major: req.body.user.major,
        DOB: req.body.user.dob,
        owner_id: req.user.id,
        advID: req.body.user.adv,
        classId: req.body.user.classId
    }
    advisorId = data.advID;
    table.update(data,{
        where:{
            id: id
        }
    })
    .then(data=>{
        res.status(200).json({
            data:data,
            message: "Successfully created!"
        })
    })
})

//getting advisor info
route.get("/myAdvisor",(req,res)=>{
    table.findAll({
        where:{
            owner_id: req.user.id
        }
    })
    .then(data=>{
        advisor.findAll({
            where:{
                owner_id: data[0].advID
            }
        })
        //digging into the advisor table according to the result from the above
        .then(data=>{
            res.status(200).json({
                data: {
                    "firstName": data[0].FirstName,
                    "lastName": data[0].LastName,
                    "email": data[0].email
                }
            })
        })
    },(err)=>{
        res.send(err.message)
    })
    .catch(console.log)
})

//list of advisor names
route.get("/advisorList",(req,res)=>{
    advisor.findAll()
        .then(data=>{
            res.status(200).json({
                data: data
            })
        })
})


//getting all the classes
route.get("/getClasses",(req,res)=>{
    classes.findAll()
        .then(data=>{
            res.status(200).json({
                data:data
            })
        },(err)=>{
            res.send(err.message);
        })
})


module.exports = route;
