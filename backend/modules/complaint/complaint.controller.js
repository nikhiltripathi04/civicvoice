const Complaint = require("./complaint.model");
const aiService = require("../ai/ai.service");

exports.createComplaint = async(req,res)=>{

 try{

  const {description,lat,lng} = req.body;

  const aiResult = aiService.classifyComplaint(description);

  const imagePath = req.file ? req.file.path : null;

  const complaint = await Complaint.create({

   description,
   image:imagePath,
   category:aiResult.category,
   department:aiResult.department,

   location:{
    lat,
    lng
   },

   user:req.user.id

  });

  res.json({
   message:"Complaint submitted",
   complaint
  });

 }catch(error){

  res.status(500).json(error);

 }

};

exports.getUserComplaints = async(req,res)=>{

 try{

  const complaints = await Complaint.find({
   user:req.user.id
  });

  res.json(complaints);

 }catch(err){
  res.status(500).json(err);
 }

};

exports.getAllComplaints = async(req,res)=>{

 const complaints = await Complaint.find()
 .populate("user","name email");

 res.json(complaints);

};

exports.updateStatus = async(req,res)=>{

 try{

  const {status} = req.body;

  const complaint = await Complaint.findByIdAndUpdate(

   req.params.id,

   {status},

   {new:true}

  );

  res.json({
   message:"Status updated",
   complaint
  });

 }catch(err){

  res.status(500).json(err);

 }

};