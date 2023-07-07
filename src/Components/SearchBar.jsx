import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Box, Image, Text, Flex, Icon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import locationIcon from "../assets/location_icon.png";
import { MdOutlineLocalActivity } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { BiBed } from "react-icons/bi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // -------------------------------------------------------------------------------------------
  // Making Search Request on pressing Enter key
  const handleSearch = async () => {
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
        query: searchTerm,
        updateToken: "",
      },
    };

    try {
      const response = await axios.request(options);
      // const data = response?.data?.data?.Typeahead_autocomplete?.results;

      console.log(response);
    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchTerm) {
        console.log(searchTerm);
        handleSearch();
      } else {
        console.log("empty search query");
      }
    }
  };
  // --------------------------------------------------------------
  // Auto Suggestion Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete",
          params: {
            query: searchTerm,
            lang: "en_US",
            units: "km",
          },
          headers: {
            "X-RapidAPI-Key":
              "dd78df51b0mshd1a123cd230e778p1ecf5ajsn736fd1c2b1af",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const data = response?.data?.data?.Typeahead_autocomplete?.results;
        setSearchResults(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchData();
      } else {
        setSearchResults([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={"42%"}
      ml={"auto"}
      mr={"auto"}
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      border={"1px solid #c9c9c9"}
      p={"30px 0px"}
    >
      <Flex
        borderBottom={"2px solid black"}
        width={"95%"}
        justifyContent={"left"}
        alignItems={"center"}
        gap={10}
      >
        <Icon as={SearchIcon} boxSize={20} />
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          mb={4}
          width={"100%"}
          border={"none"}
          fontSize="20px" // Customize the font size
          padding="8px" // Customize the padding
          _focus={{ outline: "none" }}
        />
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        {searchResults?.map((el) => {
          if (el?.text || el?.detailsV2?.isGeo) {
            return (
              <Flex
                direction={"column"}
                width={"100%"}
                _hover={{ cursor: "pointer", bgColor: "#ebe9e9f4" }}
                alignItems={"center"}
                key={el.documentId}
              >
                <Box
                  width="90%"
                  key={el.location_id}
                  borderBottom="1px solid #c9c9c9"
                  display="flex"
                  alignItems="center"
                  height={"50px"}
                  direction={"column"}
                  pt={8}
                  pb={8}
                  gap={10}
                >
                  {el?.detailsV2?.isGeo ? (
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"50%"}
                      border={"2px solid #c9c9c9"}
                      p={10}
                    >
                      {" "}
                      <Image
                        src={locationIcon}
                        alt={el.name}
                        objectFit={"contain"}
                        maxWidth={"20px"}
                      />
                    </Flex>
                  ) : el?.buCategory == "ATTRACTIONS" ? (
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"50%"}
                      border={"2px solid #c9c9c9"}
                      p={10}
                    >
                      {" "}
                      <Icon
                        as={MdOutlineLocalActivity}
                        alt={el.name}
                        objectFit={"contain"}
                        boxSize={20}
                      />
                    </Flex>
                  ) : el?.buCategory == "RESTAURANTS" ? (
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"50%"}
                      border={"2px solid #c9c9c9"}
                      p={10}
                    >
                      {" "}
                      <Icon
                        as={IoRestaurantOutline}
                        alt={el.name}
                        objectFit={"contain"}
                        boxSize={20}
                      />
                    </Flex>
                  ) : el?.buCategory == "HOTELS" ? (
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"50%"}
                      border={"2px solid #c9c9c9"}
                      p={10}
                    >
                      {" "}
                      <Icon
                        as={BiBed}
                        alt={el.name}
                        objectFit={"contain"}
                        boxSize={20}
                      />
                    </Flex>
                  ) : (
                    <Image
                      src={el?.image?.photo?.photoSizes[1]?.url}
                      alt={el.name}
                      objectFit={"contain"}
                      borderRadius={"10px"}
                    />
                  )}
                  <Flex
                    direction={"column"}
                    width={"100%"}
                    alignItems={"flex-start"}
                  >
                    <Text m={0}>{el?.text}</Text>
                    <Text m={0} color={"#969696"} fontSize={"sm"}>
                      {el?.detailsV2?.names?.longOnlyHierarchyTypeaheadV2}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            );
          }
          return null;
        })}
      </Flex>
    </Box>
  );
};

export default SearchBar;
