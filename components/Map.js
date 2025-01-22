import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import {ICON_BLACK, ICON_BLUE, ICON_GREEN, ICON_GREY, ICON_ORANGE, ICON_RED, ICON_VIOLET} from "../lib/icons";

// Map center at Toulouse
// Change depending on Input in details
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

//////////////// Mock functions to sent stations JSON //////////////////////////

export async function getData() {
  return JSON.stringify([
      {
      lat: 43.609022,
      lng: 1.459063,
      nb_bike: 15,
      status_bike: 0,
      },
      {
      lat: 43.587323,
      lng: 1.437386,
      nb_bike: 8,
      status_bike: 1,
      },
      {
      lat: 43.600614,
      lng: 1.372218,
      nb_bike: 3,
      status_bike: 5,
      },
      {
      lat: 43.605899,
      lng: 1.463601,
      nb_bike: 6,
      status_bike: 4,
      },
      {
      lat: 43.615273,
      lng: 1.442937,
      nb_bike: 13,
      status_bike: 2,
      },
      {
      lat: 43.632734,
      lng: 1.431732,
      nb_bike: 13,
      status_bike: 3,
      },
  
  ]);
  }
////////////////////////////////////////////////////////////////////////////////////

// Fetch data during server-side rendering
export async function getServerSideProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const stations = await response.json();
  return {
    props: {
      initialStations: stations,
    },
  };
}

////////////////////////////////////////////////////////////////////////////////////
export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [stations, setStations] = useState([]);

  // Apply function loadCSVData
  // Load the CSV data only when the component mounts
  useEffect(() => {
    // Function to fetch and load JSON data
    const loadJSONData = async () => {
      try {
        const response = await getData();
        const stationsData = JSON.parse(response);
        setStations(stationsData);
      } catch (error) {
        console.error("Error loading station data:", error);
      }
    };

    loadJSONData();
  }, []);

  return (
    <div className=" w-full h-full">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
          {/** await coordinates from Details page
           * Center around 
           * Zoom in
           */}
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
          />
          
          {/** await markers from Inference engines */}
          {stations.map((station, index) => (
            <Marker
              key={index}
              icon={iconFromStatus(station.status_bike)}
              position={[station.lat, station.lng]}
            >
              <Popup>Bike available : {station.nb_bike}</Popup>
            </Marker>
          ))}
        </MapContainer>
    </div>
  );
}
