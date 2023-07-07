import LocationComponent from "./LocationComponent";

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false, // Set to true for more accurate results, but may take longer and use more battery
  },
  userDecisionTimeout: 5000, // Timeout for the user's decision on sharing their location
})(LocationComponent);
