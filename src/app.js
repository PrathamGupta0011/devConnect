const express = require('express');
/**
 *  const express = require('express');

The require() function in Node.js is used to import modules.

When you run this line, Node looks into the node_modules folder for a package named express.

It loads the Express library and stores it in the variable express.

So after this line, express becomes a function that can create an app.
 */


const app = express();

//this will only handle GET call to /user

app.get("/user",(req,res) => {
    res.send({firstname: "pratham", lastname:"gupta"});
});

app.post("/user",(req,res)=>{
    //saving data to db
    res.send("data successfully saved to the database");
})

app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
})
//this will match all the http methods api calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello from the server");
});


app.listen(7777, ()=>{
    console.log("server is successfully listening on the port 7777... ");
});

/**🖥️ 6. app.listen()

This tells Express to start the server and listen for incoming connections on a port. */