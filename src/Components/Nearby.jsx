import React from "react";

const Nearby = ({ setLatitude, setLongitude }) => {
  return (
    <div>
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (GeolocationPosition) => {
              setLatitude(GeolocationPosition.coords.latitude);
              setLongitude(GeolocationPosition.coords.longitude);
            },
            (GeolocationPositionError) => {
              console.log(GeolocationPositionError.code);
            },
            {
              maximumAge: 0,
              timeout: 2000,
              enableHighAccuracy: true,
            }
          );
        }}
      >
        NEARBY
      </button>
    </div>
  );
};

export default Nearby;
