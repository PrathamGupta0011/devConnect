const mongoose =require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type :String,
        required :true,
        minLength: 4,
        maxLength: 50,
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
            if(!validator.isStrongPassword(value)){
                throw new Error("weak password"+value);
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



userSchema.methods.getJWT = async function () {
    const user = this;


    const token = await jwt.sign({ _id: user._id}, "DEV@Tinder$790",{
        expiresIn: "7d",
    });

    return token;
    
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, this.password);

    return isPasswordValid;


};


module.exports = mongoose.model("User",userSchema);