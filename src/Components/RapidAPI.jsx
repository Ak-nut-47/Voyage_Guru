import React, { useEffect } from "react";
import axios from "axios";
const RapidApitest = () => {
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://travel-advisor.p.rapidapi.com/locations/v2/search",
      params: {
        currency: "USD",
        units: "km",
        lang: "en_US",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "dd78df51b0mshd1a123cd230e778p1ecf5ajsn736fd1c2b1af",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
      data: {
        query: "chiang mai",
        updateToken: "",
      },
    };

    axios
      .request(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
};

export default RapidApitest;
