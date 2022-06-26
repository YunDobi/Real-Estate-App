import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilters from "../components/SearchFilter";
import Property from "../components/Property";

import noResult from "../assets/search.svg"
import { fetchAPI, baseURL } from "../utils/fetchAPI";

const Search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        borderColor="gray.400"
        bg="gray.100"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
        >
        <Text>Search Property by Filter</Text>
        <Icon paddingLeft={"2"} w="7" as={BsFilter} />
      </Flex>

      {searchFilters && <SearchFilters />}
      <Text fontSize={"2xl"} p="4" fontWeight={"bold"}>
        properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => <Property property={property} key={property} />)}
      </Flex>
      {properties.length === 0 && (
        <Flex justifyContent={"center"} alignItems="center" flexDirection={"column"} margin="5px 0">
          <Image src={noResult} alt="no result" width={"100vh"} height="100vh"/>
          <Text fontSize={"2xl"}>No results Found</Text>
        </Flex>
      )}
    </Box>
  )
}

export default Search;

export async function getServerSideProps({query}) {
  console.log(query.purpose)
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';


  const data = await fetchAPI(`${baseURL}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits
    },
  };
}