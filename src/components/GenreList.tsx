import { HStack, Icon, List, Skeleton, Spinner, Text } from '@chakra-ui/react';
import { BsController } from 'react-icons/bs';
import useGenres from '../hooks/useGenres';

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();

  return (
    <>
      {error && <Text color="red.400">{error}</Text>}
      <List.Root variant="plain" gap={3}>
        {isLoading &&
            <Spinner />}
        {!isLoading && genres.map((genre) => (
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