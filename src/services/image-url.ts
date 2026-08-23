type ImageSize =
  | 'cover_small'
  | 'cover_big'
  | 'cover_small_2x'
  | 'cover_big_2x'
  | 'screenshot_med'
  | 'screenshot_big'
  | '720p'
  | '1080p';

/** Matches IGDB cover art (~3:4) so cards crop less than 16:9. */
export const COVER_ASPECT_RATIO = 3 / 4;

const igdbImageUrl = (imageId: string, size: ImageSize) =>
  `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;

const getCoverUrl = (imageId?: string, size: ImageSize = 'cover_big') =>
  imageId ? igdbImageUrl(imageId, size) : undefined;

export const getCoverSources = (imageId?: string) => {
  if (!imageId) return undefined;

  const src = igdbImageUrl(imageId, 'cover_big');
  const src2x = igdbImageUrl(imageId, 'cover_big_2x');

  return {
    src,
    srcSet: `${src} 1x, ${src2x} 2x`,
  };
};

export default getCoverUrl;
