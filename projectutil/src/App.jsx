import { useState, useEffect } from "react";
import BasicCard from "./components/Feature1"; // Counter Component
import Feature2 from "./components/Feature2"; // User Data Form
import Feature3 from "./components/Feature3"; // Rich Text Editor
import Feature4 from "./components/Feature4"; // New Feature Component
import GoogleAuth from "./components/GoogleAuth";
import LogoutButton from "./components/LogoutButton"; // Logout Button
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <GoogleAuth setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="container">
      <div className="logout-container">
        <LogoutButton setIsLoggedIn={setIsLoggedIn} />
      </div>

      {/* Updated Layout with Two Items Per Row */}
      <div className="grid-container">
        <div className="grid-item"><BasicCard /></div> {/* Counter */}
        <div className="grid-item"><Feature3 /></div> {/* Rich Text Editor */}
        <div className="grid-item"><Feature2 /></div> {/* User Data Form */}
        <div className="grid-item"><Feature4 /></div> {/* Placeholder for Feature 4 */}
      </div>
    </div>
  );
}

export default App;
