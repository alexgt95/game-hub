import { Badge } from '@chakra-ui/react';

interface CriticScoreProps {
  score: number;
}

const CriticScore = ({ score }: CriticScoreProps) => {
  const colorPalette = score > 75 ? 'green' : score > 60 ? 'yellow' : 'red';

  return (
    <Badge colorPalette={colorPalette} fontSize="14px" px={2} borderRadius={4}>
      {Math.round(score)}
    </Badge>
  );
};

export default CriticScore;
