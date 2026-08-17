import { Box, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';



const GameGrid = () => {
    const { games, source, status, error } = useGames();

  return (
    <>
        <Box
            mb="4"
            p="3"
            borderWidth="1px"
            borderRadius="md"
            bg={status === 'connected' ? 'green.900' : status === 'error' ? 'red.900' : 'gray.800'}
        >
            <Text fontWeight="bold">
                {status === 'checking' && 'Comprobando Twitch / IGDB…'}
                {status === 'connected' && `Conectado a ${source} · ${games.length} juegos`}
                {status === 'error' && `Sin conexión: ${error}`}
            </Text>
            <Text fontSize="sm" opacity="0.8">
                Mira también la terminal de Vite ([igdb]) y la consola del navegador.
            </Text>
        </Box>
        <ul>
            {games.map(game => <li key={game.id}>{game.name}</li>)}
        </ul>
    </>
  )
}

export default GameGrid
