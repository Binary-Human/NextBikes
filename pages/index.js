import { useState } from "react";

import Layout from '../components/Layout';
import Section from '../components/Section';
import Container from '../components/Container';
import Sidebar from "../components/Sidebar";

import styles from '../styles/Home.module.css';

const DEFAULT_CENTER = [38.907132, -77.036546]

export default function Home(isConnected) {
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [prediction, setPrediction] = useState(null);

  return (
    <Layout style={{paddingBottom: '3px', paddingBottom: '3px' }}>
        <Sidebar />
        <div style={{ marginLeft: '300px', padding: '20px' }}>
          <Section className={`${styles.sectionOverride}`}>
            <Container>
              <h1 className={styles.title}>Welcome to Bike Sharing Predictor</h1>

              <p className={styles.description}>
                Use this app to predict bike availability based on location and time. 
                <br/>
                <br/>
                This app is meant for regular or occasional users of bike sharing systems in Toulouse, 
                but also for VêloToulouse administators looking to monitor the evolution of bike availability throughout the city.
                <br/>
                The code behind this project is accessible throught the link in the Footer.
                <br/>
                <br/>
                To test our model, please refer to Details & Prediction in the Navigation bar.
                
              </p>
            </Container>
          </Section>
        </div>
      </Layout>
  );
}



