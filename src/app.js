const express = require('express');
/**
 *  const express = require('express');

The require() function in Node.js is used to import modules.

When you run this line, Node looks into the node_modules folder for a package named express.

It loads the Express library and stores it in the variable express.

So after this line, express becomes a function that can create an app.
 */


const app = express();

const {adminAuth} =require("./middleware/auth");

app.use("/admin",adminAuth);

app.get("/user",(req,res)=>{
    res.send("User Data Sent");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All data sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a User"); 
})

app.listen(7777, ()=>{
    console.log("server is successfully listening on the port 7777... ");
});

/**🖥️ 6. app.listen()

This tells Express to start the server and listen for incoming connections on a port. */