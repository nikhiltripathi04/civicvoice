import { useState } from "react";
import API from "../services/api";
import LocationMap from "../components/LocationMap";
import Navbar from "../components/Navbar";
import "./SubmitComplaint.css";

export default function SubmitComplaint(){

 const [description,setDescription] = useState("");
 const [image,setImage] = useState(null);
 const [location,setLocation] = useState(null);
 const [name,setName] = useState("");
 const [phone,setPhone] = useState("");
 const [category,setCategory] = useState("");
 const [isSubmitting,setIsSubmitting] = useState(false);
 const [isDetectingLocation,setIsDetectingLocation] = useState(false);
 const [formError,setFormError] = useState("");
 const [formSuccess,setFormSuccess] = useState("");

 const setError = (message) => {
  setFormSuccess("");
  setFormError(message);
 };

 const handleDetectLocation = ()=>{

  if(!navigator.geolocation){
    setError("Geolocation is not supported by your browser.");
   return;
  }

  setIsDetectingLocation(true);

  navigator.geolocation.getCurrentPosition(
   (position)=>{
    setLocation({
     lat:position.coords.latitude,
     lng:position.coords.longitude
    });
    setFormError("");
    setIsDetectingLocation(false);
   },
   ()=>{
    setError("Unable to detect your location. You can click on the map to select it manually.");
    setIsDetectingLocation(false);
   }
  );

 };

 const submitComplaint = async(e)=>{

  e.preventDefault();

  if(!description.trim()){
    setError("Please add a description.");
   return;
  }

  if(!location){
    setError("Please select a location on the map.");
   return;
  }

    if (phone && !/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
    setError("Please enter a valid phone number.");
    return;
    }

    setFormError("");
    setFormSuccess("");
  setIsSubmitting(true);

  const formData = new FormData();

  formData.append("description",description.trim());
  formData.append("lat",location.lat);
  formData.append("lng",location.lng);
  if(image){
   formData.append("image",image);
  }
  formData.append("name",name);
  formData.append("phone",phone);
  formData.append("category",category);

  try{

  const response = await API.post("/complaints",formData);

  setFormSuccess(response?.data?.message || "Complaint submitted successfully.");

   setDescription("");
   setImage(null);
   setLocation(null);
   setName("");
   setPhone("");
   setCategory("");

  }catch(error){

  setError(error.userMessage || "Unable to submit complaint. Please try again.");

  }finally{
   setIsSubmitting(false);
  }

 };

 return(

  <>
  <Navbar/>

  <div className="submit-page">

  <form className="submit-card" onSubmit={submitComplaint}>

    <h2 className="submit-title">
      Report a Civic Issue Today – Build a Better City Tomorrow
    </h2>

    {formError && <p className="submit-alert submit-alert-error">{formError}</p>}
    {formSuccess && <p className="submit-alert submit-alert-success">{formSuccess}</p>}

    <div className="submit-grid">

      {/* LEFT COLUMN */}
      <div className="left-form">

        <label>Issue category</label>
        <input
          type="text"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          placeholder="e.g. Pothole, Garbage, Water leakage"
        />

        <label>Upload photo/videos</label>
        <label className="upload-box">
          <span>{image ? image.name : "Tap to Upload Image"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files?.[0] || null)}
          />
        </label>

        <label>Example Images</label>
        <div className="example-images">
          <img src="/pothole.jpg" alt="Pothole example" />
          <img src="/garbage.jpg" alt="Garbage issue example" />
          <img src="/water.jpg" alt="Water issue example" />
          <img src="/road.jpg" alt="Road issue example" />
        </div>

        <label>Your Location</label>
        <button
          type="button"
          className="detect-btn"
          onClick={handleDetectLocation}
          disabled={isDetectingLocation}
        >
          {isDetectingLocation ? "Detecting..." : "Detect My Location"}
        </button>

        <div className="map-box">
          <LocationMap setLocation={setLocation} />
        </div>

        <label>Latitude</label>
        <input type="text" value={location?.lat || ""} readOnly/>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Your full name"
        />

        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          placeholder="Your phone number"
        />

      </div>

      {/* RIGHT COLUMN */}
      <div className="right-form">

        <label>Description</label>
        <textarea
          rows="10"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Describe the issue clearly: landmark, severity, and urgency"
        ></textarea>

        <label>Longitude</label>
        <input type="text" value={location?.lng || ""} readOnly/>

      </div>

    </div>

    <p className="submit-note">Be the change. Report issues now!</p>

    <button className="submit-btn" type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>

  </form>

</div>

  </>
 );
}