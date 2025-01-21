import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import * as L from 'leaflet';

import { icon } from "leaflet"


//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// ICON CREATION   ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

const SIZE_ICON = [30, 45]
const SHADOW_SIZE = [40, 40]

const ICON_BLACK = icon({
  iconUrl: "/black.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});

const ICON_GREY = icon({
  iconUrl: "/grey.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});

const ICON_VIOLET = icon({
  iconUrl: "/violet.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});

const ICON_BLUE = icon({
  iconUrl: "/blue.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});

const ICON_GREEN = icon({
  iconUrl: "/green.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});

const ICON_ORANGE = icon({
  iconUrl: "/orange.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});

const ICON_RED = icon({
  iconUrl: "/red.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: SIZE_ICON,
  shadowSize: SHADOW_SIZE,
  iconAnchor: [15, 45],
  shadowAnchor: [10, 42]
});
//////////////////////////////////////////////////////////////////////////////////////

// Pour iterer sur les icones creer un tableau avec correspondance statut index

// Map center at Toulouse
const mapCenter = [43.605642, 1.448919];

export default function Map() {
  const [markers, setMarkers] = useState([]);

  const loadCsvData = async () => {
    try {
      const response = await fetch('/stations.csv');
      const text = await response.text();

      Papa.parse(text, {
        complete: (result) => {
          console.log('Parsed CSV data:', result.data);

          const markerData = result.data.map((row) => {
            const lat = parseFloat(row.lat);
            const lng = parseFloat(row.lng);
            const nb = parseInt(row.nb);

            // Bug relating to last line of csv being interpreted as [NaN,NaN]
            // Check if lat/lng are valid numbers  
            if (isNaN(lat) || isNaN(lng) || isNaN(nb)) {
              console.warn(`Invalid lat/lng or nb: ${row.lat}, ${row.lng}, ${row.nb}`);
              return null;
            }

            return { lat, lng, nb };
          }).filter(marker => marker !== null); // Remove invalid markers

          setMarkers(markerData);
        },
        header: true,
      });
    } catch (error) {
      console.error("Error loading CSV file:", error);
    }
  };

  useEffect(() => {
    loadCsvData(); // Load the CSV data only when the component mounts
  }, []);

  function iconFromStatus(number) {
    switch (number) {
      case 0:
        return ICON_GREY;
      case 1:
        return ICON_BLUE;
      case 2:
        return ICON_GREEN;
      case 3:
        return ICON_ORANGE;
      case 4:
        return ICON_RED;
      default:
        return ICON_BLACK;
    }
  }

  return (
    <div className=" w-full h-full">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
          />

          {/* TODO : Create different types of icons for business level */}
          {markers.map((marker, index) => (
            
            <Marker icon={iconFromStatus(marker.nb)} key={index} position={[marker.lat, marker.lng]}>
              <Popup> Bike Station state : {marker.nb = (0 <= marker.nb && marker.nb <= 4) ? marker.nb : "Not specified"} </Popup>
              {/* API to fetch exact number of bikes */}
            </Marker>
          ))}
          
        </MapContainer>
    </div>
  );
}
