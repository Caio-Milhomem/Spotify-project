import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const CLIENT_ID = "26ad3730a5814e25b7285eab249f372e";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    let storageToken: string | null = window.localStorage.getItem("token");

    // Check for token in localStorage or URL hash
    if (!storageToken && hash) {
      storageToken =
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1] || null;

      window.location.hash = ""; // Clear the hash
      if (storageToken) {
        window.localStorage.setItem("token", storageToken);
        setToken(storageToken); // Update state with the new token
      }
    } else {
      setToken(storageToken); // Set state if token exists in localStorage
    }
  }, []);

  const handleLogout = () => {
    setToken(null); // Clear token state
    window.localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <>
      <div className="text-warning bg-dark">
        <h1>Spotify playlist randomizer</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE} `}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={handleLogout}>Logout</button> // Add onClick for logout
        )}
      </div>
    </>
  );
}

export default App;
