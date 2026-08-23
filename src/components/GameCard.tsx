import { Card, HStack, Image } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import { COVER_ASPECT_RATIO, getCoverSources } from '../services/image-url';
import CriticScore from './CriticScore';
import PlatformIconList from './PlatformIconList';

interface GameCardProps {
    game: Game;
    loading?: 'lazy' | 'eager';
}

const GameCard = ({ game, loading = 'lazy' }: GameCardProps) => {
  const cover = getCoverSources(game.cover?.image_id);

  return (
    <Card.Root borderRadius={10} overflow='hidden'>
      {cover && (
        <Image
          src={cover.src}
          srcSet={cover.srcSet}
          alt={game.name}
          aspectRatio={COVER_ASPECT_RATIO}
          fit='cover'
          loading={loading}
          decoding='async'
        />
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
