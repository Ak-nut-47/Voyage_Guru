import React from "react";

const LocationPermissionModal = ({ onRequestPermission, onDenyPermission }) => {
  return (
    <div className="modal">
      <h2>Location Access</h2>
      <p>We need your location to provide personalized results.</p>
      <div>
        <button onClick={onRequestPermission}>Allow</button>
        <button onClick={onDenyPermission}>Deny</button>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
