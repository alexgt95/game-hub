import { Button, HStack, Icon, List, Skeleton, Spinner, Text } from '@chakra-ui/react';
import { BsController } from 'react-icons/bs';
import useGenres from '../hooks/useGenres';
import { Genre } from '../types/Genre';

/* ecibe selectedGenre y onSelectGenre como props y retorna un componente que muestra una lista de generos */
interface GenreListProps {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: GenreListProps) => {
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
              {/* si el genero es igual al selectedGenre, se muestra en negrita, si no, se muestra normal */}
              <Button
                onClick={() => onSelectGenre(genre)}
                fontSize="lg"
                fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                variant="plain"
                _hover={{ textDecoration: 'underline' }}
              >
                {genre.name}
              </Button>
            </HStack>
          </List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default GenreList;