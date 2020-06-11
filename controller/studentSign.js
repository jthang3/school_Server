const express = require("express");
const Route = express.Router();
const jwt = require("jsonwebtoken")
const table = require("../db").import("../module/studentUser");
const advisorTable = require("../db").import("../module/advisorUser");
const bcrypt = require("bcryptjs");


//student
//sign up
Route.post("/signup",(req,res)=>{
    let data = {
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password,10)
    }
    table.create(data)
        .then(data=>{
            let token = jwt.sign({id: data.id},process.env.SIGN,{expiresIn: 60*60*12});
            res.status(200).json({
                account: data,
                message: "Successfully created",
                sessionToken: token
            })
        },(err)=>res.status(401).send(err,err.message))
        .catch(console.log)
})

//login
Route.post("/login",(req,res)=>{
    table.findOne({
        where: {
            username: req.body.user.username
        }
    })
    .then(user=>{
        if(user){
            bcrypt.compare(req.body.user.password,user.password,(err,match)=>{
                if(match){
                    let token = jwt.sign({id: user.id},process.env.SIGN,{expiresIn: 60*60*24});
                    res.status(200).json({
                        user: user,
                        message: "Successfully logged in",
                        sessionToken: token
                    })
                }
                else{
                    res.status(401).json({
                        err: "Password not matches, Please reenter your password"
                    })
                }
            })
        }
        else{
            res.status(501).json({
                err: "User not found. Please create an account first"
            })
        }
    },err=>{
        console.log(err,err.message);
    })
})


//advisor sign up
Route.post("/advisorSignup",(req,res)=>{
    //data coming from the user
    data = {
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password)
    }
    advisorTable.create(data)
        .then(data=>{
            let token = jwt.sign({id: data.id},process.env.SIGN);
            res.status(200).json({
                user: data,
                message: "Successfully created",
                sessionToken: token
            })
        },(err=>console.log(err.message)))
        .catch(console.log)
});


//advisor log in
Route.post("/advisorLogin",(req,res)=>{
    advisorTable.findOne({
        where: {
            username: req.body.user.username
        }
    })
    .then(data=>{
        bcrypt.compare(req.body.user.password,data.password,(err,match)=>{
            if(match){
                let token = jwt.sign({id: data.id},process.env.SIGN,{expiresIn:60*60*24});
                res.status(200).json({
                    user: data,
                    message: "Successfully logged in",
                    sessionToken: token
                })
            }
            else{
                res.status(401).json({
                    message: "password not match!"
                })
            }
        })
    },(err)=>{
        console.log(err.message);
    })
    .catch(console.log);
})



module.exports = Route;