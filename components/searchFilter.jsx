import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import noresult from "../assets/search.svg"

import { filterData, getFilterValues } from "../utils/filterData";
import { baseURL, fetchAPI } from "../utils/fetchAPI";


const SearchFilters = () => {
  const [filters, setFilters] = useState({});
  const [showLocations, setShowLocations] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState();
  const router = useRouter()

  const searchProperties = (filterValue) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValue)
    // console.log(values)

    values.forEach((item) => {
      if(item.value && filterValue?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchAPI(`${baseURL}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <Flex bg={"gray.100"} p="4" justifyContent={"center"} flexWrap="wrap">
      {filterData.map((filter) => (
        //create the selection
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} >
            
            {/* create the options in the selection */}
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
 <Flex flexDir='column'>
        <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    <Image src={noresult} width="50vh" height="50vh" alt="property"/>
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
