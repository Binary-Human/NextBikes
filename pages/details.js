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
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  // If submit, redirect to map
  useEffect(() => {
    if (submit && prediction) {
      router.replace('/map');
    }
  }, [submit, prediction, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPrediction(true); // Get actual prediction, see below
    setSubmit(true);

    // Simulate an API request
    // OBSOLETE
    // const response = await fetch(`/api/forecast?address=${address}&time=${time}`);
    // const data = await response.json();

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
                
              {/* <Result prediction={prediction} /> */}
            </div>
          </Container>
        </Section>
      </div>
    </Layout>
  );
}
