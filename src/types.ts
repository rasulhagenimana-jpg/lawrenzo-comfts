export interface PhotoItem {
  id: string;
  name: string;
  url: string; // Data URL or object URL
  size: number; // in bytes
  format: string; // e.g. image/jpeg, image/png
  width: number;
  height: number;
  dateCaptured: string;
  source: 'camera' | 'upload' | 'sample';
}

export type ActiveTab = 'home' | 'studio' | 'upload' | 'library';
