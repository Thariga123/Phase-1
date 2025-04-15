import React from "react";
import useGeolocation from "../hooks/useGeolocation";
import "../App.css";

const GeoLocationDisplay = () => {
  const { location, error } = useGeolocation();

  return (
    <div className="geo-container">
      <h2>Geolocation Info</h2>
      {error ? (
        <p className="error-msg">Error: {error}</p>
      ) : location.lat && location.lng ? (
        <div className="location-info">
          <p>Latitude: <strong>{location.lat}</strong></p>
          <p>Longitude: <strong>{location.lng}</strong></p>
        </div>
      ) : (
        <p className="loading-msg">Fetching location...</p>
      )}
    </div>
  );
};

export default GeoLocationDisplay;
