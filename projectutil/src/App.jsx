import { useState, useEffect } from 'react';
import BasicCard from './components/Feature1';
import './App.css';
import Feature2 from './components/Feature2';
import Feature3 from './components/Feature3';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const clientId = '86038152485-r3t7mpnclgonc8jvbvshhllmthnqrh8f.apps.googleusercontent.com'; // Use your actual client ID

  // Check if the user is logged in by looking at LocalStorage
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login success
  const handleSuccess = (response) => {
    console.log('Google login success:', response);

    // Store the access token in localStorage
    localStorage.setItem('accessToken', response.credential);

    // Store login status in LocalStorage
    localStorage.setItem('isLoggedIn', true);

    setIsLoggedIn(true);
  };

  // Handle login error
  const handleError = (error) => {
    console.error('Google login error:', error);
  };

  if (!isLoggedIn) {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>
    );
  }

  return (
    <div>
      <BasicCard />
      <Feature2 />
      <Feature3 />
    </div>
  );
}

export default App;
