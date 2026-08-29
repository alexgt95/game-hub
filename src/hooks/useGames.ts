import useData from "./useData";
import { Platform as GamePlatform } from "../services/platforms";
import { Genre } from "../types/Genre";
import { Platform } from "../types/Platform";

export interface Game {
    id: number;
    name: string;
    cover?: { id: number; image_id: string };
    platforms?: GamePlatform[];
    aggregated_rating?: number;
}

const useGames = (selectedGenre: Genre | null, selectedPlatform: Platform | null) =>
    useData<Game>(
        '/games',
        { params: { genres: selectedGenre?.id, platforms: selectedPlatform?.id } },
        [selectedGenre?.id, selectedPlatform?.id]
    );

export default useGames;
