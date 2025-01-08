import { useState } from "react";
import dynamic from "next/dynamic";
import InputForm from "../components/InputForm";
import Result from "../components/Result";

import Layout from '../components/Layout';
import Section from '../components/Section';
import Container from '../components/Container';

import client from "../lib/mongoDB";

import styles from '../styles/Home.module.css';

const DEFAULT_CENTER = [38.907132, -77.036546]

// Dynamically import the Map component with ssr: false to avoid server-side rendering issues
const Map = dynamic(() => import("../components/Map"), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional loading state
});

// Update boolean for correct connection
export const getServerSideProps = async () => {
  try {
    await client.connect() // Will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false }
    }
  }
}


export default function Home(isConnected) {
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [prediction, setPrediction] = useState(null);

  // Utility function for submitting button -> Generate prediction
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Simulate an API request
    const response = await fetch(`/api/forecast?address=${address}&time=${time}`);
    const data = await response.json();

    setPrediction(data.prediction);
  };

  return (
    <Layout>
      <Section>
        <Container>
          <h1 className={styles.title}>
            Bike Sharing Predictor
          </h1>

          {isConnected ? (
            <h2 className={styles.description}>
              You are connected to MongoDB!
            </h2>
          ) : (
            <h2 className={styles.description}>
              You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
              for instructions.
            </h2>
          )}
          
          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
          </Map>

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
            
            {prediction && <Result prediction={prediction} />}
          </div>
        </Container>
      </Section>
      </Layout>
  );
}



