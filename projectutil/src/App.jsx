import { useState, useEffect } from 'react';
import BasicCard from './components/Feature1';
import Feature2 from './components/Feature2';
import Feature3 from './components/Feature3';
import GoogleAuth from './components/GoogleAuth';
import LogoutButton from './components/LogoutButton'; // Import LogoutButton

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by looking at LocalStorage
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <GoogleAuth setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
    <div>

    </div>
      <LogoutButton setIsLoggedIn={setIsLoggedIn} /> {/* Render LogoutButton */}
    <div>
      <BasicCard />
      <Feature2 />
      <Feature3 />
    </div>
    </>
  );
}

export default App;
