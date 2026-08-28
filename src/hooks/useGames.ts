import useData from "./useData";
import { Platform } from "../services/platforms";
import { Genre } from "../types/Genre";

export interface Game {
    id: number;
    name: string;
    cover?: { id: number; image_id: string };
    platforms?: Platform[];
    aggregated_rating?: number;
}

const useGames = (selectedGenre: Genre | null) =>
    useData<Game>(
        '/games',
        { params: { genres: selectedGenre?.id } },
        [selectedGenre?.id]
    );

export default useGames;
