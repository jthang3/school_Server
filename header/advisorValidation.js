let jwt = require("jsonwebtoken");
let User = require("../db").import("../module/advisorUser");

module.exports = (req,res,next)=>{
    if(req.method == "OPTION"){
        next();
    }
    else{
        //will get this info from the client
        let sessionToken = req.headers.authorization;
        
        //if the token is not exit
        if(!sessionToken){
            return res.status(401).send({
                auth: false,
                message: "No token has been provided"
            })
        }
        else{
            jwt.verify(sessionToken,process.env.SIGN,(err,decoded)=>{
                if(decoded){
                    User.findOne({
                        where:{
                            id: decoded.id
                        }
                    })
                    .then(user=>{
                        req.user = user
                        next();
                    },err=>res.send(500,err.message))
                }
                else{
                    res.send("Token not match");
                }
            })
        }
    }
}