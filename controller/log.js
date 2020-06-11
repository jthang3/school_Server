const express = require("express");
const route = express.Router();
const student = require("../module/studentUser");
const advisor = require("../module/advisorUser");

route.get("student",(req,res)=>{
    student.findAll()
        .then(data=>{
            res.status(200).json({
                data: data
            })
        })
})

module.exports = route;