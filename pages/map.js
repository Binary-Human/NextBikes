'use-client';

import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import TimeReferenceButtons from "../components/TimeReferenceButtons";

import { useSearchParams } from "next/navigation";

import styles from "../styles/Home.module.css";

// Dynamically import the Map component with ssr: false to avoid server-side rendering issues
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPage( ) {
  const searchParams = useSearchParams();

  // Extract latitude and longitude from search parameters OR Default
  const lat = parseFloat(searchParams.get("lat")) || 43.605642;
  const lng = parseFloat(searchParams.get("lng")) || 1.448919;
  const zoom =parseFloat(searchParams.get("zoom")) || 16.5 ;

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

            <Map initialCenter={[lat, lng]} zoom={zoom} />

            <TimeReferenceButtons/>

          </Container>
        </Section>
      </div>
    </Layout>
  );
}
