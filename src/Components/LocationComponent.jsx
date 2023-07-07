const LocationComponent = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
}) => {
  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation.</div>;
  }

  if (!isGeolocationEnabled) {
    return (
      <div>
        Geolocation is not enabled. Please enable it in your browser settings.
      </div>
    );
  }

  if (coords) {
    const { latitude, longitude } = coords;
    // Use the latitude and longitude to make your API request
    // Example: fetch data based on the user's location
    // fetchData(latitude, longitude);
  }

  return <div>Loading...</div>;
};

export default LocationComponent;
