import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { Box, Text } from '@chakra-ui/react';

interface Game {
    id: number;
    name: string;
}

interface FetchGamesResponse {
    count: number;
    results: Game[];
    source?: string;
}

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [source, setSource] = useState('');
    const [status, setStatus] = useState('checking');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('[igdb] browser → GET /api/games');

        apiClient.get<FetchGamesResponse>('/games')
        .then(res => {
            setGames(res.data.results);
            setSource(res.data.source ?? 'unknown');
            setStatus('connected');
            console.log('[igdb] connected', {
                source: res.data.source,
                count: res.data.count,
                sample: res.data.results.slice(0, 3),
            });
        })
        .catch(err => {
            const message = err.response?.data?.error || err.message;
            setError(message);
            setStatus('error');
            console.error('[igdb] failed', message);
        });
    }, []);

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
