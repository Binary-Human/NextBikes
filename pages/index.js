import { useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import InputForm from "../components/InputForm";
import Result from "../components/Result";
import 'leaflet/dist/leaflet.css';

// Dynamically import the Map component with ssr: false to disable server-side rendering
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make API request to your ARIMAX prediction endpoint (mocked)
    const response = await fetch(`/api/forecast?address=${address}&time=${time}`);
    const data = await response.json();

    setPrediction(data.prediction); // Mocked response
  };

  return (
    <div>
      <h1>Bike Sharing Predictor</h1>
      <Map />
      <InputForm 
        address={address} 
        setAddress={setAddress} 
        time={time} 
        setTime={setTime} 
        handleSubmit={handleSubmit} 
      />
      {prediction && <Result prediction={prediction} />}
    </div>
  );
}
