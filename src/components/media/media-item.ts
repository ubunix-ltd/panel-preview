export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnailSrc?: string;
  alt: string;
  title: string;
  description?: string;
}
