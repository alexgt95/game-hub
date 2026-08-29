import useData from "./useData";
import { Platform } from "../types/Platform";

export type { Platform };

const usePlatforms = () => useData<Platform>('/platforms');

export default usePlatforms;
