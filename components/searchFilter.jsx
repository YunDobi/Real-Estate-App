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

import { filterData, getFilterValues } from "../utils/filterData";


const SearchFilters = () => {
  const [filters, setFilters] = useState({});
  const router = useRouter()

  const searchProperties = (filterValue) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValue)
    console.log(values)

    values.forEach((item) => {
      if(item.value && filterValue?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query });
  };

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
      
    </Flex>
  );
};

export default SearchFilters;
