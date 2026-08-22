export interface Platform {
  id: number;
  name: string;
  slug: string;
  abbreviation?: string;
  platform_family?: number;
}

export type ParentPlatform =
  | 'pc'
  | 'mac'
  | 'linux'
  | 'playstation'
  | 'xbox'
  | 'nintendo'
  | 'sega';

const FAMILY_TO_PARENT: Record<number, ParentPlatform> = {
  1: 'playstation',
  2: 'xbox',
  3: 'sega',
  4: 'linux',
  5: 'nintendo',
};

/** Plan B for platforms that have no platform_family (PC, Mac). */
const SLUG_TO_PARENT: Record<string, ParentPlatform> = {
  win: 'pc',
  mac: 'mac',
  linux: 'linux',
};

export const getParentPlatforms = (platforms: Platform[] = []): ParentPlatform[] => {
  const parents = platforms.map((platform) =>
    platform.platform_family != null
      ? FAMILY_TO_PARENT[platform.platform_family]
      : SLUG_TO_PARENT[platform.slug]
  );

  return [...new Set(parents.filter((parent): parent is ParentPlatform => Boolean(parent)))];
};
