import React from "react";
import "./Map.css";
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";




const Map = ({ position, zoom }) => {
    console.log(zoom)
    
  return (
    <div className="map">
        <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   
  </MapContainer>
    </div>
  );
};

export default Map;
