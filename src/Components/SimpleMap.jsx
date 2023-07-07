import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Box, Icon } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";

const Pointer = ({ text, lat, lng }) => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    zIndex={55}
  >
    <Icon as={MdLocationOn} boxSize={16} color="red" />
  </Box>
);

export default function SimpleMap({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) {
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });

  const handleMapChange = ({ center }) => {
    setCenter(center);
    setLatitude(center.lat);
    setLongitude(center.lng);
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "300px", width: "600px", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={center}
        defaultZoom={11}
        draggableCursor="grab"
        onChange={handleMapChange}
      ></GoogleMapReact>
      <Pointer />
    </div>
  );
}
//Correctly working before change
