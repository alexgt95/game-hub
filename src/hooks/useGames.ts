import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
    id: number;
    name: string;
}

interface FetchGamesResponse {
    count: number;
    results: Game[];
    source?: string;
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [source, setSource] = useState('');
    const [status, setStatus] = useState('checking');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('[igdb] browser → GET /api/games');

        const abortController = new AbortController();

        apiClient.get<FetchGamesResponse>('/games', { signal: abortController.signal })
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

        return () => abortController.abort();
        })
        .finally(() => {
            if (!abortController.signal.aborted) {
                setStatus('connected');
            }
        });
    }, []);

    return { games, source, status, error };
}

export default useGames;