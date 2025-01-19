import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Map center at Toulouse
const mapCenter = [43.605642, 1.448919];

export default function Map() {
  return (
    <div className=" w-full h-full">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />

        {/** TODO : List of markers for all stations */}

        <Marker position={mapCenter}>
            <Popup>Bike Station</Popup> {/** Put up the number of bikes available */}
        </Marker>
        </MapContainer>
    </div>
  );
}
