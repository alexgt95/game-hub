type ImageSize =
  | 'cover_small'
  | 'cover_big'
  | 'screenshot_med'
  | 'screenshot_big'
  | '720p'
  | '1080p';

const getCoverUrl = (imageId?: string, size: ImageSize = 'cover_big') =>
  imageId
    ? `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`
    : undefined;

export default getCoverUrl;
