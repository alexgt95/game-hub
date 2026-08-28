import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import { Genre } from '../types/Genre';

const SKELETON_COUNT = 8;

/* recibe selectedGenre como props y retorna un componente que muestra una grilla de juegos */
interface GameGridProps {
  selectedGenre: Genre | null;
}

const GameGrid = ({ selectedGenre }: GameGridProps) => {
  const { data: games, error, isLoading } = useGames(selectedGenre);

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap={3}
        padding="10px"
      >
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <GameCard key={index} loading />
          ))}
        {!isLoading &&
          games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              imgLoading={index < 4 ? 'eager' : 'lazy'}
            />
          ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
