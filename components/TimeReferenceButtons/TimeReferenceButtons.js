import { useState } from "react";
import styles from "./TimeReferenceButtons.module.css";

export default function TimeReferenceButtons() {
  const [selectedTime, setSelectedTime] = useState(1); // Default to 1 hour

  const timeOptions = [1, 2, 3, 4];

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
          Selected Time : {selectedTime} Hour{selectedTime > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
