import { Card, HStack, Image, Skeleton } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import { COVER_ASPECT_RATIO, getCoverSources } from '../services/image-url';
import CriticScore from './CriticScore';
import PlatformIconList from './PlatformIconList';

interface GameCardProps {
  game?: Game;
  loading?: boolean;
  imgLoading?: 'lazy' | 'eager';
}

const GameCard = ({ game, loading = false, imgLoading = 'lazy' }: GameCardProps) => {
  const cover = game ? getCoverSources(game.cover?.image_id) : undefined;

  return (
    <Card.Root borderRadius={10} overflow='hidden'>
      <Skeleton loading={loading} aspectRatio={COVER_ASPECT_RATIO}>
        {cover && (
          <Image
            src={cover.src}
            srcSet={cover.srcSet}
            alt={game?.name}
            aspectRatio={COVER_ASPECT_RATIO}
            fit='cover'
            loading={imgLoading}
            decoding='async'
          />
        )}
      </Skeleton>
      <Card.Body>
        <Skeleton loading={loading}>
          <Card.Title>{game?.name ?? 'Nombre del juego'}</Card.Title>
        </Skeleton>
        <HStack justify='space-between' my={2} align='center'>
          <Skeleton loading={loading}>
            <PlatformIconList platforms={game?.platforms ?? []} />
          </Skeleton>
          <Skeleton loading={loading}>
            <CriticScore score={game?.aggregated_rating ?? 0} />
          </Skeleton>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default GameCard;