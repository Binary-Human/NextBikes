import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Placeholder mock for map center
const mapCenter = [43.605642, 1.448919]; // Example: London

export default function Map() {
  return (
    <div className=" w-full h-full">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapCenter}>
            <Popup>Bike Station</Popup>
        </Marker>
        </MapContainer>
    </div>
  );
}
