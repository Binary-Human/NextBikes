// pages/_app.js
import '../styles/global.css';  // Import your global styles
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;