import { useState } from "react";
import styles from "./TimeReferenceButtons.module.css";

export default function TimeReferenceButtons() {
  const [selectedTime, setSelectedTime] = useState(1); // Default to 1 hour

  const timeOptions = [1, 2, 3, 4];

  function sendPredictRequest(){
    // Send request to Inference API
  }

  return (
    <div>
      <div className={styles.card}>

        <div className={styles.buttonsContainer}>
          {timeOptions.map((time) => (
            <button
              key={time}
              className={`${styles.button} ${
                selectedTime === time ? styles.activeButton : ""
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time} Hour{time > 1 ? "s" : ""}
            </button>
          ))}
        </div>
        
        <p className={styles.selectedTime}>
          Select Time
        </p>
        <button
              className={`${styles.button} margin: 0 padding:0`}
            >
              { /* onClick={} Trigger inference */ }
              Predict
            </button>
      </div>
    </div>
  );
}
