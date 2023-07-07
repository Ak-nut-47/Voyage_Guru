import React, { useState, useEffect } from "react";
import LocationPermissionModal from "./LocationPermissionModal";

const LocationPermissionModalWrapper = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const hasGivenPermission = localStorage.getItem("locationPermission");
    if (!hasGivenPermission) {
      setShowPermissionModal(true);
      requestLocationPermission();
    } else {
      // Permission already granted, get user's location
      getUserLocation();
    }
  }, []);

  const requestLocationPermission = () => {
    if (!navigator.permissions) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          setShowPermissionModal(false);
          getUserLocation();
        } else if (permissionStatus.state === "prompt") {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === "granted") {
              setShowPermissionModal(false);
              getUserLocation();
            }
          };
        } else if (permissionStatus.state === "denied") {
          handlePermissionDeny();
        }
      })
      .catch((error) => {
        console.error("Error requesting location permission:", error);
      });
  };

  const handlePermissionRequest = () => {
    localStorage.setItem("locationPermission", "true");
    setShowPermissionModal(false);
    getUserLocation();
  };

  const handlePermissionDeny = () => {
    // Handle logic when the user denies location permission
    alert("Location access denied. Some features may not be available.");
    // You can choose to show a default location or hide location-dependent features
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      {showPermissionModal && (
        <LocationPermissionModal
          onRequestPermission={handlePermissionRequest}
          onDenyPermission={handlePermissionDeny}
        />
      )}
      {userLocation && (
        <div>
          Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
        </div>
      )}
      {/* Other components */}
    </div>
  );
};

export default LocationPermissionModalWrapper;
