const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({

 description:{
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
 },

 image:{
  type:String
 },

 category:{
  type:String
 },

 department:{
  type:String
 },

 location:{
  lat:Number,
  lng:Number
 },

 status:{
  type:String,
  enum:["pending","assigned","in-progress","resolved"],
  default:"pending"
 },

 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required: [true, "Complaint must be associated with a user"],
 }

},{timestamps:true});

module.exports = mongoose.model("Complaint",ComplaintSchema);