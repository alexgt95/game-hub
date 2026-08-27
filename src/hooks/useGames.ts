import useData from "./useData";
import { Platform } from "../services/platforms";

export interface Game {
    id: number;
    name: string;
    cover?: { id: number; image_id: string };
    platforms?: Platform[];
    aggregated_rating?: number;
}

const useGames = () => useData<Game>('/games')

export default useGames;
