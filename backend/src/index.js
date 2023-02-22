const express = require("express");

const app = express();

var bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const JWTHelper = require("./../helpers/jwtHelper");

app.get("/",(request,response,next)=>{
    response.send("พ่อมึงตาย 555");
});

app.post("/api/auth",(request,response,next)=>{
    try{

        const payload = JWTHelper.verifyToken(request);
        if(!payload) throw new Error("login_expire");

        response.status(200).json({message :"ok" , status : true});
    }catch(error){
     console.error(error.stack);
     response.status(500).json({message :error.message , status : false});
     next();   
   }
})

app.post("/api/login",(request,response,next)=>{
   try{

    let users = [{username : "admin" , password : "555"}];

    let {username,password} = request.body;

    if(!username || !password) throw new Error("invalid_param");

    let user = users.find((item)=>{
        return item.username == username && item.password == password;
    });

    if(!user) throw new Error("not_found_user");

    let payload = {username};

    let token = JWTHelper.createToken(payload);

    response.status(200).json({message : "ok" , status : true,token});
   }catch(error){
     console.error(error.stack);
     response.status(500).json({message :error.message , status : false});
     next();   
   }
});

const port = 3000;

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})