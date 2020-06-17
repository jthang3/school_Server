let jwt = require("jsonwebtoken");
let User = require("../db").import("../module/advisorUser");

const validateSession = (req,res,next)=>{
    if(req.method == "OPTIONS"){
        next();
    }
    else{
        //will get this info from the client
        let sessionToken = req.headers.authorization;
        
        //if the token is not exit
        if(!sessionToken){
            return res.status(401).send({
                auth: false,
                message: "No token has provided"
            })
        }
        else{
            jwt.verify(sessionToken,process.env.SIGN,(err,decoded)=>{
                if(!err && decoded){
                    User.findOne({
                        where:{
                            id: decoded.id
                        }
                    })
                    .then(user=>{
                        req.user = user
                        return next();
                    },err=>res.send(500,err.message))
                }
                else{
                    res.send("Token not match");
                }
            })
        }
    }
}

module.exports = validateSession;