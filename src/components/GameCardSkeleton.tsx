import { Card, HStack, Skeleton } from '@chakra-ui/react';
import { COVER_ASPECT_RATIO } from '../services/image-url';

const GameCardSkeleton = () => {
  return (
    <Card.Root borderRadius={10} overflow='hidden'>
      <Skeleton aspectRatio={COVER_ASPECT_RATIO} />
      <Card.Body>
        <Skeleton height='24px' mb={4} />
        <HStack justify='space-between' my={2} align='center'>
          <Skeleton height='16px' width='50%' />
          <Skeleton height='20px' width='36px' />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default GameCardSkeleton;
