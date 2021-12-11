import { Box, Flex } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import React from 'react';
import { Banner } from '../components/Banner';
import { Property } from '../components/Property';
import { api } from '../utils/api';

export default function Home({ propertiesForSale, propertiesForRent }: any) {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental homes for"
        title2="Everyone"
        description="Explore Apartments, Villas, Homes"
        description2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property: any) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        description="Explore Apartments, Villas, Homes"
        description2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property: any) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const propertieForSale = await api.get(
    '/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6'
  );

  const propertieForRent = await api.get(
    '/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6'
  );

  return {
    props: {
      propertiesForSale: propertieForSale?.data.hits,
      propertiesForRent: propertieForRent?.data.hits,
    },
  };
};
