export default function InputForm({ address, setAddress, time, setTime, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Time:</label>
          <input 
            type="datetime-local" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Get Prediction</button>
      </form>
    );
  }
  