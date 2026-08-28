import { useEffect, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import apiClient from "../services/api-client";

interface FetchDataResponse<T> {
    count: number;
    results: T[];
    source?: string;
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: unknown[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(`[igdb] browser → GET ${endpoint}`);

        const abortController = new AbortController();
        setIsLoading(true);

        apiClient.get<FetchDataResponse<T>>(endpoint, { signal: abortController.signal, ...requestConfig })
        .then(res => {
            setError('');
            setData(res.data.results ?? []);
            setIsLoading(false);
        })
        .catch(err => {
            if (abortController.signal.aborted) return;
            const message = err.response?.data?.error || err.message;
            setError(message);
            setIsLoading(false);
        });

        return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ? [...deps] : []);

    return { data, error, isLoading };
};

export default useData;