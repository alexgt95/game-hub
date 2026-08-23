import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';

const SKELETON_COUNT = 8;

const GameGrid = () => {
    const { games, error, status } = useGames();
    const isLoading = status === 'checking';

  return (
    <>
        {error && <Text>{error}</Text>}
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
            gap={10}
            padding="10px"
        >
            {isLoading &&
              Array.from({ length: SKELETON_COUNT }, (_, index) => (
                <GameCardSkeleton key={index} />
              ))}
            {games.map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
            ))}
        </SimpleGrid>
    </>
  )
}

export default GameGrid
