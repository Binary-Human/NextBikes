import { useEffect, useState } from "react";
import InputForm from "../components/Input-Form"; 
import Layout from "../components/Layout";
import Section from "../components/Section";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";

import { useRouter } from 'next/router';

// Utility function for submitting button -> Generate prediction
export default function Details() {
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const router = useRouter();

  // Load saved values if they exist
  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    const savedTime = localStorage.getItem("time");

    if (savedAddress) setAddress(savedAddress);
    if (savedTime) setTime(savedTime);
  }, []);

  // Save local at every UI update
  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);
  useEffect(() => {
    localStorage.setItem("time", time);
  }, [time]);

  // Construct API request to inference MS
  async function getTime(time) {
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + time);

    const formattedDateTime = datetime
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    try {
      /*
      const response = await fetch(
        `{API_ENDPOINT}inference?datetime=${encodeURIComponent(formattedDateTime)}`
      );
      const data = await response.json();
      */
      const data = await getData(datetime)                               // Mock function

      const stationsData = JSON.parse(data);
      setStations(stationsData);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("No results found for the provided address.");
      }

      const { lat, lon } = data[0];
      setCoordinates({ lat, lon });
      console.log("Coordinates fetched successfully:", { lat, lon });

      setPrediction(true);

      // Redirect to the map page, passing coordinates as query parameters
      router.push(`/map?lat=${lat}&lng=${lon}&zoom=16.5`);                    // ADD TIME
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert(error.message);
    }
  };
  
  return (
    <Layout>
      <Sidebar />
      <div style={{ marginLeft: "300px" }}>
        <Section>
          <Container>
            <h1 className={styles.title}>Bike Sharing Predictor - Details</h1>
            <p className={styles.description}>
              <code className={styles.code}>Pick a place and a time</code>
            </p>
            <div className={styles.view}>
              <InputForm
                address={address}
                setAddress={setAddress}
                time={time}
                setTime={setTime}
                handleSubmit={handleSubmit}
              />
            </div>
          </Container>
        </Section>
      </div>
    </Layout>
  );
}
