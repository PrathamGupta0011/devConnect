const express =require("express");
const authRouter = express.Router();
const {validateSignUpData} =require("../utils/validation"); 
const User =require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req,res) =>{


    try{
    // validation of signup data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

    // encrypt the password

    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash); 
    
    // creating new instance of user model

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
         res.send("User Added Successfully"); 
    } catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
    
}); 



authRouter.post("/login", async(req,res)=>{
    try{
        const{emailId, password}= req.body;

        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("User is not present in the DB");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            // create a jwt token

            const token = await user.getJWT();
            
            // addd the token to the cookie and send the response back to the user
            res.cookie("token",token,{
                expires: new Date(Date.now()+8*3600000)
            });

            res.send("login successfull!!!")
        }else{
            throw new Error("Password is not correct");
        }
    }catch(err){
        res.status(400).send("ERROR :" +err.message );
    }

    
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull !!!");
});

module.exports = authRouter;