export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number;
  transition: 'fade' | 'slide' | 'zoom';
}

export interface TextOverlay {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  position: { x: number; y: number };
  style: {
    fontSize: number;
    color: string;
  };
}

export interface VideoProject {
  audioFile: File | null;
  audioUrl: string;
  duration: number;
  media: Media[];
  textOverlays: TextOverlay[];
  lyrics: string[];
}