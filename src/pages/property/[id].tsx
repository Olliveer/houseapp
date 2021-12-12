import { Flex, Box, Spacer, Text, Avatar } from '@chakra-ui/react';
import { GoVerified } from 'react-icons/go';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { api } from '../../utils/api';
import { ImageScrollbar } from '../../components/ImageScrollbar';

type Amenitie = {
  externalID: number;
  format: string;
  rank: number;
  slug: string;
  text: string;
  text_l1: string;
  value: string;
};

type PropertyData = {
  propertyDetails: {
    price: number;
    rentFrequency: string;
    rooms: string;
    title: string;
    baths: string;
    area: number;
    agency: {
      logo: {
        url: string;
      };
    };
    isVerified: string;
    description: string;
    type: string;
    purpose: string;
    furnishingStatus: string;
    amenities: Amenitie[];
    photos: {
      externalID: string;
      id: number;
      title: string;
      url: string;
    }[];
  };
};

export default function PropertyDetails({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}: PropertyData) {
  console.log(amenities);
  return (
    <Box maxW={'1000px'} margin="auto" p="4">
      {photos && <ImageScrollbar photos={photos} />}

      <Box width={'full'} p="6">
        <Flex
          paddingTop={'2'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Flex alignItems={'center'}>
            <Box paddingRight={'3'} color={'green.400'}>
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight={'bold'} fontSize={'lg'}>
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar sizer="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>

        <Flex
          alignItems={'center'}
          p="1"
          justifyContent={'space-between'}
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
          <BsGridFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize={'lg'} marginBottom={'2'} fontWeight={'bold'}>
            {title}
          </Text>

          <Text lineHeight={'2'} color="gray.600">
            {description}
          </Text>
        </Box>

        <Flex
          flexWrap={'wrap'}
          textTransform={'uppercase'}
          justifyContent={'space-between'}
        >
          <Flex
            justifyContent={'space-between'}
            width={'400px'}
            borderBottom={'1px'}
            borderColor={'gray.100'}
            p="3"
          >
            <Text>Type</Text>
            <Text fontWeight={'bold'}>{type}</Text>
          </Flex>

          <Flex
            justifyContent={'space-between'}
            width={'400px'}
            borderBottom={'1px'}
            borderColor={'gray.100'}
            p="3"
          >
            <Text>Pupose</Text>
            <Text fontWeight={'bold'}>{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent={'space-between'}
              width={'400px'}
              borderBottom={'1px'}
              borderColor={'gray.100'}
              p="3"
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight={'bold'}>{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && (
            <Text fontSize={'2xl'} fontWeight={'black'} marginTop={'5'}>
              Amenities
            </Text>
          )}

          <Flex flexWrap={'wrap'}>
            {amenities.map((amenity) => (
              <Text
                fontWeight={'bold'}
                color="blue.400"
                fontSize={'l'}
                p={'2'}
                bg={'gray.200'}
                m="1"
                borderRadius={'5'}
                key={amenity.text}
              >
                {amenity.text}
              </Text>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const data = await api.get(`/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data.data,
    },
  };
};
