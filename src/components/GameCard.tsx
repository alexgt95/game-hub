import { Card, HStack, Image } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import getCoverUrl from '../services/image-url';
import CriticScore from './CriticScore';
import PlatformIconList from './PlatformIconList';

interface GameCardProps {
    game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const cover = getCoverUrl(game.cover?.image_id);

  return (
    <Card.Root borderRadius={10} overflow='hidden'>
      {cover && (
        <Image src={cover} alt={game.name} aspectRatio={16 / 9} fit='cover' />
      )}
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <HStack justify="space-between" my={2} align="center">
          <PlatformIconList platforms={game.platforms ?? []} />
          {game.aggregated_rating != null && (
            <CriticScore score={game.aggregated_rating} />
          )}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}

export default GameCard;
