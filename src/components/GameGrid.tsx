import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import { GameQuery } from '../App';

const SKELETON_COUNT = 8;

/* recibe selectedGenre y selectedPlatform como props y retorna un componente que muestra una grilla de juegos */
interface GameGridProps {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: GameGridProps) => {
  const { data: games, error, isLoading } = useGames(gameQuery);

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
