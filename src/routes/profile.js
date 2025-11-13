const express =require("express");
const profileRouter = express.Router();

const{userAuth} = require("../middleware/auth");

profileRouter.get("/profile", userAuth, async(req,res)=>{
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

module.exports = profileRouter;