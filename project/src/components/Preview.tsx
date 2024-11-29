import React from 'react';
import { Player } from '@remotion/player';
import { useVideoStore } from '../store/videoStore';
import { VideoComposition } from './VideoComposition';

export const Preview: React.FC = () => {
  const { project } = useVideoStore();
  const durationInFrames = Math.ceil((project.duration || 1) * 30);

  return (
    <div className="rounded-lg overflow-hidden bg-gray-800 shadow-xl">
      <div className="aspect-video">
        <Player
          component={VideoComposition}
          durationInFrames={durationInFrames}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          controls
          inputProps={{ project }}
          style={{
            width: '100%',
            height: '100%',
          }}
          loop
          showVolumeControls
          errorFallback={() => (
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">
                {!project.audioFile 
                  ? 'Drop an audio file to start your music video'
                  : 'Error playing preview'}
              </p>
            </div>
          )}
        />
      </div>
    </div>
  );
};