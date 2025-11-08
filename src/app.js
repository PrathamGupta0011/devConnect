const express = require('express');
const connectDB =require("./config/database");
const app = express();
const User =require("./models/user");

app.use(express.json());

 

app.post("/signup", async (req,res) =>{
    const user = new User(req.body);


    try{
        await user.save();
    res.send("User Added Successfully"); 
    } catch(err){
        res.status(400).send("Error saving the user:"+ err.message);
    }
    
});

connectDB()
.then(()=>{
    console.log("Database connection Established...");
    app.listen(7777, ()=>{
    console.log("server is successfully listening on the port 7777... ");
});

})
.catch((err)=>{
    console.error("Database can't be connected!!");
    console.error("Error Details:",err.message);
});


/**🖥️ 6. app.listen()

This tells Express to start the server and listen for incoming connections on a port. */