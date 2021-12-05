import { Box, Button, Flex, Text, Link } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

type BannerProps = {
  purpose: string;
  title1: string;
  title2: string;
  description: string;
  description2: string;
  buttonText: string;
  linkName: string;
  imageUrl: string;
};

export function Banner({
  purpose,
  title1,
  title2,
  description,
  description2,
  imageUrl,
  buttonText,
  linkName,
}: BannerProps) {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="md">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1} <br /> {title2}
        </Text>
        <Text color="gray.700" pt="3" pb="3" fontSize="lg">
          {description}
          <br /> {description2}
        </Text>

        <Button fontSize="xl" bg="blue.300" color="white">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
}
