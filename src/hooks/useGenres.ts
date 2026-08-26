import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('[igdb] browser → GET /api/genres');

        const abortController = new AbortController();

        apiClient.get<FetchGenresResponse>('/genres', { signal: abortController.signal })
        .then(res => {
            setError('');
            setGenres(res.data.results ?? []);
            setIsLoading(false);
        })
        .catch(err => {
            if (abortController.signal.aborted) return;
            const message = err.response?.data?.error || err.message;
            setError(message);
            setIsLoading(false);
        });

        return () => abortController.abort();
    }, []);

    return { genres, error, isLoading };
};

export default useGenres;