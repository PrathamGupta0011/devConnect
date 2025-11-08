const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type :String,
        required :true,
    },
    lastName: {
        type :String,
        
    },
    emailId: {
        type :String,
        required :true,
        unique :true,
        trim :true,
        lowercase :true,
        trim :true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address: "+ value);
            }
        },
    },
    password: {
        type :String,
        required :true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email"+value);
            }
        },
    },
    age: {
        type :Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
    },
    about: {
        type: String,
        default: "This is deffault about the user!",
    },
    skills: {
         type: [String],
    },
},{
    timestamps :true,
});


module.exports = mongoose.model("User",userSchema);