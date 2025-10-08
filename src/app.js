const express = require('express');


const app = express();

app.use("/hello", (req, res)=>{
    res.send("Hello this is pratham gupta");
})


app.use((req, res)=>{
    res.send("server is listening");
})

app.listen(3000, ()=>{
    console.log("server is running on port ");
})