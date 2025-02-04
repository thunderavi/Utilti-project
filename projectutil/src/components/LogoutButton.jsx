
import PropTypes from 'prop-types'; // Import PropTypes

function LogoutButton({ setIsLoggedIn }) {
  const handleLogout = () => {
    // Remove login status and token from LocalStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');

    // Update state to reflect that the user is logged out
    setIsLoggedIn(false);
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

// PropTypes validation
LogoutButton.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LogoutButton;
