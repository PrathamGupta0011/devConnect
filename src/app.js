const express = require('express');
const connectDB =require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


// Feed Api - GET /Feed -get all the users from the database
// app.get("/feed", async(req,res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch(err){
//         res.status(400).send("something went wrong");
//     }

// }); 

// app.delete("/user" , async (req,res) =>{
//     const userId= req.body.userId;
//     try{
//         const user =await User.findByIdAndDelete(userId);

//         res.send("User deleted successfully");
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// });


// // Update the user
// app.patch("/user/:userId", async (req, res) =>{
//     const userId =req.params?.userId;
//     const data =req.body;
//     try{
//         const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
//         const isUpdateAllowed =Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

//         if(!isUpdateAllowed){
//             throw new Error("Update not allowed");
//         }

//         if(data?.skills.length>10){
//             throw new Error("Update Not Allowed");
//         }

//         await User.findByIdAndUpdate({ _id: userId }, data);
//         res.send("user updated successfully");
//     }catch(err){
//         res.status(400).send("something went wrong");
//     }

// });



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


