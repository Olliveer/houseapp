import NextLink from 'next/link';
import {
  Menu,
  Flex,
  Box,
  Spacer,
  Link,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FcAbout, FcHome, FcMenu } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

export function NavBar() {
  return (
    <Flex p="2" borderBottom="1px" borderColor={'gray.100'}>
      <Box fontSize={'3xl'} color={'blue.400'} fontWeight={'bold'}>
        <NextLink href="/" passHref>
          <Link paddingLeft={'2'}>Houseapp</Link>
        </NextLink>
      </Box>
      <Spacer />

      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outlined"
            color={'red.400'}
          />
          <MenuList>
            <NextLink href="/" passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </NextLink>

            <NextLink href="/search" passHref>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </NextLink>

            <NextLink href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
            </NextLink>

            <NextLink href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
