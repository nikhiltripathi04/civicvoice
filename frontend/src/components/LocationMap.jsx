import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationMarker({setLocation}) {
 const [position,setPosition] = useState(null);

 useMapEvents({
  click(e){
   const {lat,lng} = e.latlng;
   setPosition([lat,lng]);
   setLocation({lat,lng});
  }
 });

 return position === null ? null : <Marker position={position} />;

}

const LocationMap = () => {
 

  return (
    <MapContainer
        center={[28.6139,77.2090]}
        zoom={13}
        style={{height:"400px"}}
    >

        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker setLocation={setLocation}/>

    </MapContainer>
  )
}

export default LocationMap
