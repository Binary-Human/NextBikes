'use-client';

import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import TimeReferenceButtons from "../components/TimeReferenceButtons";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getData } from "../lib/getData"; // Mock function for data JSON

import styles from "../styles/Home.module.css";

// Dynamically import the Map component with ssr: false to avoid server-side rendering issues
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPage( ) {
  const searchParams = useSearchParams();
  const API_ENDPOINT = "api/"                                           // TODO : UPDATE
  const [stations, setStations] = useState([]);

  // Extract latitude and longitude from search parameters OR Default
  const lat = parseFloat(searchParams.get("lat")) || 43.605642;
  const lng = parseFloat(searchParams.get("lng")) || 1.448919;
  const zoom = parseFloat(searchParams.get("zoom")) || 12;

  const time = 0; // Set to transmitted time, otherwise now
  // Preliminary fetch of inference

  // Construct API request to inference MS
  async function handlePredict(time) {
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

  return (
    <Layout>
      <Sidebar />
      <div style={{ marginLeft: "300px" }}>
        <Section>
          <Container>

            <h1 className={styles.title}>Bike Sharing Predictor - Map</h1>
            <p className={styles.description}>
              <code className={styles.code}>Explore the map</code>
            </p>

            <Map initialCenter={[lat, lng]} zoom={zoom} stations={stations} />

            <TimeReferenceButtons onPredict={handlePredict}/>

          </Container>
        </Section>
      </div>
    </Layout>
  );
}
