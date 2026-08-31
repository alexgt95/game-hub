import useData from "./useData";
import { Platform as GamePlatform } from "../services/platforms";
import { GameQuery } from "../App";

export interface Game {
    id: number;
    name: string;
    cover?: { id: number; image_id: string };
    platforms?: GamePlatform[];
    aggregated_rating?: number;
}

const useGames = (gameQuery: GameQuery) =>
    useData<Game>(
        '/games',
        { params: { genres: gameQuery.genre?.id, platforms: gameQuery.platform?.id } },
        [gameQuery.genre?.id, gameQuery.platform?.id]
    );

export default useGames;
