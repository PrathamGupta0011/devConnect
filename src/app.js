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

// Get user by email
app.get("/user", async(req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail });
        if(users.length ===0){
            res.status(404).send("User Not Found");
        }else{
            res.send(users);

        }
        
    }catch(err){
        res.status(400).send("something went wrong");
    }
});



// Feed Api - GET /Feed -get all the users from the database
app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong");
    }

}); 

app.delete("/user" , async (req,res) =>{
    const userId= req.body.userId;
    try{
        const user =await User.findByIdAndDelete(userId);

        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});


// Update the user
app.patch("/user/:userId", async (req, res) =>{
    const userId =req.params?.userId;
    const data =req.body;
    try{
        const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
        const isUpdateAllowed =Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length>10){
            throw new Error("Update Not Allowed");
        }

        await User.findByIdAndUpdate({ _id: userId }, data);
        res.send("user updated successfully");
    }catch(err){
        res.status(400).send("something went wrong");
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
    console.error("Database can't be connected!");
    console.error("Error Details:",err.message);
});


