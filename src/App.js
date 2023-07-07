
import './App.css';
import SimpleMap from './Components/SimpleMap';
// import RapidApitest from './Components/RapidAPI';
import GetRoutetest from './Components/GetRoutetest';
import SearchBar from './Components/SearchBar';
import LocationComponent from './Components/LocationComponent';
import LocationPermissionModalWrapper from './Location/LocationPermissionModalWrapper';
import Nearby from './Components/Nearby';
import { Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';



function App() {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  return (
    <div className="App">
      <h1>Voyage Guru</h1>
      <hr />

      <hr />
      <hr />
      {/* <RapidApitest /> */}
      {/* <GetRoutetest /> */}
      <SearchBar />
      {/* <LocationComponent /> */}
      {/* <LocationPermissionModalWrapper /> */}
      <Flex width={"100%"} justifyContent={"space-evenly"}>
        <Nearby {...{ setLatitude, setLongitude }} />
        {latitude && longitude && <SimpleMap {...{ latitude, longitude, setLatitude, setLongitude }} />}
      </Flex>




      <div>
        {console.log(latitude)}
        {console.log(longitude)}

      </div>
    </div>
  );
}

export default App;
