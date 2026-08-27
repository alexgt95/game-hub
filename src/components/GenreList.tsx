import { HStack, Icon, List, Skeleton, Text } from '@chakra-ui/react';
import { BsController } from 'react-icons/bs';
import useGenres from '../hooks/useGenres';

const SKELETON_COUNT = 10;

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();

  return (
    <>
      {error && <Text color="red.400">{error}</Text>}
      <List.Root variant="plain" gap={3}>
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <List.Item key={index} paddingY="5px">
              <HStack>
                <Skeleton boxSize="32px" borderRadius="md" />
                <Skeleton height="16px" width="120px" />
              </HStack>
            </List.Item>
          ))}
        {!isLoading &&
          genres.map((genre) => (
            <List.Item key={genre.id} paddingY="5px">
              <HStack>
                <Icon as={BsController} boxSize="8" color="gray.500" />
                <Text fontSize="lg">{genre.name}</Text>
              </HStack>
            </List.Item>
          ))}
      </List.Root>
    </>
  );
};

export default GenreList;
