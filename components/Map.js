import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import {ICON_BLACK, ICON_BLUE, ICON_GREEN, ICON_GREY, ICON_ORANGE, ICON_RED, ICON_VIOLET} from "../lib/icons";

// Map center at Toulouse
const mapCenter = [43.605642, 1.448919];

// Return corresponding icon for station state
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

//////////////////////////////////////////////////////////////////////
export default function Map() {
  const [markers, setMarkers] = useState([]);

  // Lat Long and numb data from csv for stations
  // Put into state markers
  const loadCSVData = async () => {
    try {
      const response = await fetch('/stations.csv');
      const text = await response.text();

      // TODO : Turn CSV parsing into Json processing
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

  // Apply function loadCSVData
  // Load the CSV data only when the component mounts
  useEffect(() => {
    loadCSVData(); 
  }, []);

  return (
    <div className=" w-full h-full">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
          />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              icon={iconFromStatus(marker.nb)}
              position={[marker.lat, marker.lng]}
            >
              <Popup>Bike Station state: {0 <= marker.nb && marker.nb <= 4 ? marker.nb : "Not specified"}</Popup>
            </Marker>
          ))}

        </MapContainer>
    </div>
  );
}
