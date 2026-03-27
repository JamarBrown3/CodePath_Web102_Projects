import { useState } from 'react'
import ApiCall from './components/ApiCall'
import './App.css'

function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [banListed, setBanListed] = useState([]);
  const [whatSeen, setWhatSeen] = useState([]);

  const handleSeen = (item) => {
    // History list: Only add if we haven't seen this game yet
    setWhatSeen((prev) => {
      if (prev.find(game => game.name === item.name)) return prev;
      return [...prev, item];
    });
  }

  // NEW: Function to remove items from the ban list
  const handleUnban = (indexToRemove) => {
    setBanListed((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="Maindiv">
      <h1>Veni-Vinci</h1>
      <div className="worldDiv">
        
        {/* LEFT DIV: History of what has been seen */}
        <div className="leftDiv">
          <h2>Who we've seen</h2>
          <div className="history-container">
            {whatSeen.map((item, index) => (
              <div key={index} className="history-item">
                {/* FIX: Render specific properties, not the whole object */}
                <p>{item.name}</p>
                {item.image && <img src={item.image} alt={item.name} className="history-thumb" />}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER DIV: The API interaction */}
        <div className="centerDiv">
          <ApiCall 
            accessKey={ACCESS_KEY} 
            banList={banListed} 
            setBanList={setBanListed} 
            onSeen={handleSeen} 
          />
        </div>

        {/* RIGHT DIV: The Banned List with clickable buttons */}
        <div className="rightDiv">
          <h2>Banned List</h2>
          <p>Click a button to unban it</p>
          <div className="banned-buttons-container">
            {banListed.map((item, index) => (
              <button 
                key={index} 
                className="ban-button" 
                onClick={() => handleUnban(index)}
              >
                {item.value}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;