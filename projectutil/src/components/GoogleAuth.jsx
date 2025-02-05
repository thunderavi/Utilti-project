import PropTypes from "prop-types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./GoogleAuth.css";

function GoogleAuth({ setIsLoggedIn }) {
  const clientId =
    "86038152485-r3t7mpnclgonc8jvbvshhllmthnqrh8f.apps.googleusercontent.com";

  const handleSuccess = (response) => {
    console.log("Google login success:", response);
    localStorage.setItem("accessToken", response.credential);
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  const handleError = (error) => {
    console.error("Google login error:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="google-login-container">
        {/* Floating fake chat bubbles */}
        <div className="chat-bubbles">
          <div className="chat-bubble">{"Welcome! 🎉"}</div>
          <div className="chat-bubble">{"Login securely with Google 🔐"}</div>
          <div className="chat-bubble">{"Excited to see you! 😊"}</div>
          <div className="chat-bubble">{"🚀 Your journey starts here"}</div>
        </div>

        {/* Floating glow elements */}
        <div className="floating-glow"></div>

        <div className="login-box">
          <h2>🚀 Login to Get Access</h2>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="outline"
            size="large"
          />
        </div>

        {/* Features grid */}
        <div className="features-grid">
  <div className="feature-card">
    <h3>📊 Feature 1</h3>
    <p>Counter Component: A simple component to increment, decrement, and reset a counter value, demonstrating state management with React hooks.</p>
  </div>
  <div className="feature-card">
    <h3>📝 Feature 2</h3>
    <p>User Data Form: A form to collect user details (name, address, email, phone) with local storage support and an unsaved changes warning.</p>
  </div>
  <div className="feature-card">
    <h3>🎨 Feature 3</h3>
    <p>Rich Text Editor: A text editor using ReactQuill with dark mode support, saving and loading text content from local storage, and unsaved changes alerts.</p>
  </div>
  <div className="feature-card">
    <h3>⚡ Feature 4</h3>
    <p>Progress Charts: Visualize user activity (browsing, idle, active) and time spent in the form of bar and radar charts using chart.js integration.</p>
  </div>
</div>

      </div>
    </GoogleOAuthProvider>
  );
}

GoogleAuth.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default GoogleAuth;
