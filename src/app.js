const express = require('express');
/**
 *  const express = require('express');

The require() function in Node.js is used to import modules.

When you run this line, Node looks into the node_modules folder for a package named express.

It loads the Express library and stores it in the variable express.

So after this line, express becomes a function that can create an app.
 */

const connectDB =require("./config/database");

const app = express();


connectDB()
.then(()=>{
    console.log("Database connection Established...");
    app.listen(7777, ()=>{
    console.log("server is successfully listening on the port 7777... ");
});

})
.catch((err)=>{
    console.error("Database can't be connected!!");
});


/**🖥️ 6. app.listen()

This tells Express to start the server and listen for incoming connections on a port. */