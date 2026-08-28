import useData from "./useData";
import { Genre } from "../types/Genre";

export type { Genre };

const useGenres = () => useData<Genre>('/genres');

export default useGenres;