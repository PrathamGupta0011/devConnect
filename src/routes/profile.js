const express =require("express");
const profileRouter = express.Router();

const{userAuth} = require("../middleware/auth");
const { validateSignUpData } = require("../utils/validation");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try{
        const user = req.user;

        res.send(user);
    }catch(err){
        res.status(400).send("Error :"+ err.message);
    }
    // try{
    //     const cookies = req.cookies;

    //     const {token} = cookies;
    //     // validate my token

    //     const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
        

    //     const{ _id }=decodedMessage;

    //     console.log("Logged in User is :" + _id);

    //     const user = req.user;

    //     res.send(user);

    // }catch(err){
    //     res.status(400).send("ERROR" +err.message);
    // }


    // console.log(cookies);
    // res.send("Reading cookies");
});


profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

        await loggedInUser.save();
        
        res.json({
            message:`${loggedInUser.firstName}, your profile has been updated successfully`, data: loggedInUser,
        });
    }catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }

});

module.exports = profileRouter;