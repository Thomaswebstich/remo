import React from 'react';
import { Composition } from 'remotion';
import { VideoComposition } from '../components/VideoComposition';
import type { VideoProject } from '../types';

const defaultProject: VideoProject = {
  audioFile: null,
  audioUrl: '',
  duration: 60,
  media: [],
  textOverlays: [],
  lyrics: [],
};

export const Root: React.FC = () => {
  return (
    <Composition
      id="MusicVideo"
      component={VideoComposition}
      durationInFrames={30 * 60}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        project: defaultProject,
      }}
    />
  );
};