import {useState} from "react";
import API from "../services/api";
import LocationMap from "../components/LocationMap";

export default function SubmitComplaint(){

 const [description,setDescription] = useState("");
 const [image,setImage] = useState(null);
 const [location,setLocation] = useState(null);

 const submitComplaint = async()=>{

  const formData = new FormData();

  formData.append("description",description);
  formData.append("lat",location.lat);
  formData.append("lng",location.lng);
  formData.append("image",image);

  await API.post("/complaints",formData);

  alert("Complaint submitted");

 };

 return(

  <div>

   <h2>Submit Complaint</h2>

   <textarea
    placeholder="Describe the issue"
    onChange={(e)=>setDescription(e.target.value)}
   />

   <br/><br/>

   <input
    type="file"
    onChange={(e)=>setImage(e.target.files[0])}
   />

   <h3>Select Location</h3>

   <LocationMap setLocation={setLocation}/>

   <button onClick={submitComplaint}>
    Submit Complaint
   </button>

  </div>

 );

}