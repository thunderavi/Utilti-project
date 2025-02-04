import PropTypes from 'prop-types';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function GoogleAuth({ setIsLoggedIn }) {
  const clientId = '86038152485-r3t7mpnclgonc8jvbvshhllmthnqrh8f.apps.googleusercontent.com'; // Use your actual client ID

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

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
}

GoogleAuth.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default GoogleAuth;
