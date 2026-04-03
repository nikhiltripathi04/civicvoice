const mongoose = require("mongoose");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const UserSchema = new mongoose.Schema({

 name:{
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
 },

 email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegex, "Please enter a valid email address"],
 },

 password:{
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    match: [passwordRegex, "Password must contain uppercase, lowercase, and number"],
 },

 role:{
  type:String,
  enum:["user","admin","officer"],
  default:"user"
 }

},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);