const express = require("express");
const route = express.Router();
const table = require("../db").import("../module/student");
const advisor = require("../db").import("../module/advisor");
const classes = require("../db").import("../module/class");
const AdvValidate = require("../header/advisorValidation");

route.use(AdvValidate);
//posting new advisor
route.post("/advisor",AdvValidate,(req,res)=>{
    data = {
        FirstName: req.body.user.first,
        LastName: req.body.user.last,
        email: req.body.user.email,
        owner_id: req.user.id
    }
    advisor.create(data)
        .then(data=>{
            res.status(200).json({
                data: data,
                message: "Successfully created"
            })
        })
});

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
//getting advisor info
route.get("/advisorInfo",(req,res)=>{
    advisor.findAll({
        where: {
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
    .catch(console.log);
})

route.get("/myStudent",(req,res)=>{
    table.findAll({
        where: {
            advID: req.user.id
        }
    })
    .then(data=>{
        res.status(200).json({
            data: data
        })
    },(err)=>{
        res.send(err.message);
    })
})

//deleting a student
route.delete("/:id",(req,res)=>{
    let id = req.params.id;
    let advisorId = req.user.id;
    table.destroy({
        where: {
            id: id,
            advID: advisorId
        }
    })
    .then(data=>{
        res.status(200).json({
            message: "Successully deleted"
        })
    })
})

//deleting a class
route.delete("/deleteClass/:id",(req,res)=>{
    let id = req.params.id;
    classes.destroy({
        where:{
            id:id
        }
    })
    .then(data=>{
        res.status(200).json({
            message:"Successfully deleted"
        })
    })
})
//updating a classes
route.put("/classes/:id",(req,res)=>{
    let id = req.params.id;
    const data = {
        Subject: req.body.subject,
        RoomNum: req.body.room,
        Capacity: req.body.capacity
    }
    classes.update(data,{
        where:{
            id: id
        }
    })
    .then(data=>{
        res.status(200).json({
            message: "Class Successfully Updated!"
        })
    })
})

//creating a class

route.post("/createClass",(req,res)=>{
    let info = {
        Subject: req.body.subject,
        RoomNum: req.body.room,
        Capacity: req.body.capacity
    }
    classes.create(info)
        .then(data=>{
            res.status(200).json({
                class: data
            })
        },(err)=>{
            res.status(401).send(err.message);
        })
})

//list of student in each class
route.get("/allStudent",(req,res)=>{
    classes.findAll({
        where: {
            id: req.body.classID
        }
    })
    .then(data=>{
        res.status(200).json({
            data: data
        })
    },err=>{
        res.send(err.message);
    })
})

//advisor updating
route.put("/:id",AdvValidate,(req,res)=>{
    let id = req.params.id;
    const data = {
        FirstName: req.body.user.first,
        LastName: req.body.user.last,
        email: req.body.user.email,
        owner_id: req.user.id
    }
    advisor.update(data,{
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




module.exports = route;
