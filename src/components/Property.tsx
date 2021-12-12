import NextLink from 'next/link';
import NextImage from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { GoVerified } from 'react-icons/go';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';

type PropertyData = {
  property: {
    coverPhoto: {
      url: string;
    };
    price: number;
    rentFrequency: string;
    title: string;
    baths: string;
    rooms: string;
    area: number;
    agency: {
      logo: {
        url: string;
      };
    };
    isVerified: boolean;
    externalID: string;
  };
};

export function Property({ property }: PropertyData) {
  return (
    <NextLink href={`/property/${property.externalID}`} passHref>
      <Flex
        flexWrap={'wrap'}
        w={'420px'}
        p={'5'}
        paddingTop={'0'}
        justifyContent={'flex-start'}
        cursor={'pointer'}
      >
        <Box>
          <NextImage
            src={
              property.coverPhoto
                ? property.coverPhoto.url
                : 'https://via.placeholder.com/150'
            }
            alt={property.title}
            width={400}
            height={260}
          />
        </Box>
        <Box w={'full'}>
          <Flex
            paddingTop={'2'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex alignItems={'center'}>
              <Box paddingRight={'3'} color={'green.400'}>
                {property.isVerified && <GoVerified />}
              </Box>
              <Text fontWeight={'bold'} fontSize={'lg'}>
                AED {millify(property.price)}
                {property.rentFrequency && `/${property.rentFrequency}`}
              </Text>
            </Flex>
            <Box>
              <Avatar sizer="sm" src={property.agency?.logo?.url} />
            </Box>
          </Flex>

          <Flex
            alignItems={'center'}
            p="1"
            justifyContent={'space-between'}
            w="250px"
            color="blue.400"
          >
            {property.rooms} <FaBed /> | {property.baths} <FaBath /> |{' '}
            {millify(property.area)} sqft <BsGridFill />
          </Flex>
          <Text fontSize={'lg'}>
            {property.title.length > 30
              ? `${property.title.substring(0, 30)}...`
              : property.title}
          </Text>
        </Box>
      </Flex>
    </NextLink>
  );
}
