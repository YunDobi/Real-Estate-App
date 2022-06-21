import Link from "next/link";
import { Menu, MenuButton, MenuList, IconButton, Flex, Box, Spacer, MenuItem } from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout} from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey} from "react-icons/fi";

const Navbar = () => {
  return(

  <Flex p="2" borderBottom="1px" borderColor="gray.100">
    <Box fontSize="3xl" color="blue.400" fontWeight="bold">
      <Link href="/" paddingleft="2">Real</Link>
    </Box>
    <Spacer />

    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} varient="outlined" color="red.400"/>
        <MenuList>
          {/* //home link */}
          <Link href="/" passHref>
            <MenuItem icon={<FcHome />}>Home</MenuItem>
          </Link>
          {/* //search link */}
          <Link href="/search" passHref>
            <MenuItem icon={<BsSearch />}>Search</MenuItem>
          </Link>
          {/* //for-sale link */}
          <Link href="/search?purpose=for-sale" passHref>
            <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
          </Link>
          {/* //for-rent link */}
          <Link href="/serch?purpose=for-rent" passHref>
            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
  )
};

export default Navbar;