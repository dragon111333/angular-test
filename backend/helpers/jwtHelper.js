const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = class JWT { 
    static createToken(payload){
        return jwt.sign(payload,process.env.SECRET_KEY,{"expiresIn" : "60s"});
    }

    static verifyToken(request){
        try{
            const token = String(request.headers.authorization).split(" ")[1];
            return jwt.verify(token,process.env.SECRET_KEY);
        }catch(error){
            console.error(error.stack);
            return null;
        }
    }
}