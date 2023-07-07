import React, { useEffect, useState } from "react";
import axios from "axios";
const GetRoutetest = () => {
  const [geoLocation, setGeoLocation] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete",
      params: {
        query: "taj ",
        lang: "en_US",
        units: "km",
      },
      headers: {
        "X-RapidAPI-Key": "dd78df51b0mshd1a123cd230e778p1ecf5ajsn736fd1c2b1af",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((res) => {
        console.log(res?.data?.data?.Typeahead_autocomplete?.results);
        setGeoLocation(res?.data?.data?.Typeahead_autocomplete?.results);
        console.log(`geolocation - ${geoLocation}`);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {geoLocation?.map((el) => {
        if (el?.detailsV2?.geocode) {
          return (
            <div>
              <p>{`Latitude ${el?.detailsV2?.geocode?.latitude}`}</p>
              <p>{`Longitude - ${el?.detailsV2?.geocode?.longitude}`}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default GetRoutetest;
