import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/profile/getImage`);
        console.log(response)
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
      <div className="profile-container">
    
      <div className="profile-picture">
        <img src={user.image} alt={`'s profile`} />
      </div>
     
    </div>
      
        
      </header>
    </div>
  );
}

export default App;
