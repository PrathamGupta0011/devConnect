const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namastedev:Pratham9775@namastenode.4obgexu.mongodb.net/devTinder");
};

module.exports= connectDB;