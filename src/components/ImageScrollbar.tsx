import NextImage from 'next/image';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useContext } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={'center'} alignItems={'center'} marginRight={'1'}>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize={'2xl'}
        cursor={'pointer'}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={'center'} alignItems={'center'} marginRight={'1'}>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize={'2xl'}
        cursor={'pointer'}
      />
    </Flex>
  );
};

type Photo = {
  externalID: string;
  id: number;
  title: string;
  url: string;
};

type ImageScrollbarProps = {
  photos: Photo[];
};

export function ImageScrollbar({ photos }: ImageScrollbarProps) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      // @ts-ignore
      style={{ overflow: 'hidden' }}
    >
      {photos.map((photo) => (
        <Box
          key={photo.id}
          w={'910px'}
          itemID={photo.externalID}
          overflow={'hidden'}
        >
          <NextImage
            alt="property"
            src={photo.url}
            placeholder="blur"
            blurDataURL={photo.url}
            width={1000}
            height={500}
            sizes="(max-width: 500px) 100px (max-width): 1023px 400px, 1000px)"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
