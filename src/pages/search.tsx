import NextImage from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SearchFilters } from '../components/SearchFilters';
import { Property } from '../components/Property';

import noResultImg from '../assets/noresult.svg';
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsResult,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { api } from '../utils/api';

type Property = {
  id: string;
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

type PropertiesData = {
  properties: Property[];
};

export default function Search({ properties }: PropertiesData) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>

      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          flexDir={'column'}
          marginTop={'5'}
          marginBottom={'5'}
        >
          <NextImage alt="no result" src={noResultImg} />

          <Text fontSize={'2xl'} marginTop={'3'}>
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

  const data = await api.get(
    `/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data.data?.hits,
    },
  };
};
