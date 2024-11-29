import { create } from 'zustand';
import { VideoProject, Media, TextOverlay } from '../types';
import { getAudioDurationInSeconds } from '@remotion/media-utils';

interface VideoStore {
  project: VideoProject;
  setAudioFile: (file: File) => Promise<void>;
  addMedia: (media: Media) => void;
  removeMedia: (id: string) => void;
  addTextOverlay: (overlay: TextOverlay) => void;
  removeTextOverlay: (id: string) => void;
  setLyrics: (lyrics: string[]) => void;
}

const DEFAULT_DURATION = 60; // Default duration in seconds

export const useVideoStore = create<VideoStore>((set) => ({
  project: {
    audioFile: null,
    audioUrl: '',
    duration: DEFAULT_DURATION,
    media: [],
    textOverlays: [],
    lyrics: [],
  },
  setAudioFile: async (file) => {
    const url = URL.createObjectURL(file);
    let duration;
    try {
      duration = await getAudioDurationInSeconds(url);
    } catch (error) {
      console.error('Error getting audio duration:', error);
      duration = DEFAULT_DURATION;
    }
    
    set((state) => ({
      project: {
        ...state.project,
        audioFile: file,
        audioUrl: url,
        duration: Math.ceil(duration),
      },
    }));
  },
  addMedia: (media) =>
    set((state) => ({
      project: {
        ...state.project,
        media: [...state.project.media, media],
      },
    })),
  removeMedia: (id) =>
    set((state) => ({
      project: {
        ...state.project,
        media: state.project.media.filter((m) => m.id !== id),
      },
    })),
  addTextOverlay: (overlay) =>
    set((state) => ({
      project: {
        ...state.project,
        textOverlays: [...state.project.textOverlays, overlay],
      },
    })),
  removeTextOverlay: (id) =>
    set((state) => ({
      project: {
        ...state.project,
        textOverlays: state.project.textOverlays.filter((t) => t.id !== id),
      },
    })),
  setLyrics: (lyrics) =>
    set((state) => ({
      project: {
        ...state.project,
        lyrics,
      },
    })),
}));