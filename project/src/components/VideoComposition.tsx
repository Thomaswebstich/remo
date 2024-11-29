import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, spring } from 'remotion';
import { VideoProject } from '../types';
import React, { useMemo } from 'react';

interface VideoCompositionProps {
  project: VideoProject;
}

const TRANSITION_DURATION = 30; // 1 second at 30fps

export const VideoComposition: React.FC<VideoCompositionProps> = ({ project }) => {
  const frame = useCurrentFrame();

  const mediaSequences = useMemo(() => {
    if (!project.media.length) return [];
    
    let currentFrame = 0;
    return project.media.map((media) => {
      const sequence = {
        ...media,
        startFrame: currentFrame,
        endFrame: currentFrame + (media.duration * 30),
      };
      currentFrame += media.duration * 30;
      return sequence;
    });
  }, [project.media]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
      {project.audioFile && (
        <Audio src={project.audioUrl} />
      )}
      
      {mediaSequences.map((media) => {
        const isVisible = frame >= media.startFrame && frame <= media.endFrame;
        if (!isVisible) return null;

        const relativeFrame = frame - media.startFrame;
        const exitFrame = media.endFrame - media.startFrame;

        const opacity = interpolate(
          relativeFrame,
          [0, TRANSITION_DURATION, exitFrame - TRANSITION_DURATION, exitFrame],
          [0, 1, 1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const scale = media.transition === 'zoom'
          ? interpolate(
              relativeFrame,
              [0, TRANSITION_DURATION],
              [1.2, 1],
              { extrapolateRight: 'clamp' }
            )
          : 1;

        const translateX = media.transition === 'slide'
          ? interpolate(
              relativeFrame,
              [0, TRANSITION_DURATION],
              [100, 0],
              { extrapolateRight: 'clamp' }
            )
          : 0;

        return (
          <Sequence key={media.id} from={media.startFrame} durationInFrames={media.duration * 30}>
            <AbsoluteFill>
              <img
                src={media.url}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity,
                  transform: `scale(${scale}) translateX(${translateX}%)`,
                  transition: 'transform 0.5s ease-out',
                }}
                alt=""
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {project.textOverlays.map((overlay) => (
        <Sequence
          key={overlay.id}
          from={overlay.startTime * 30}
          durationInFrames={(overlay.endTime - overlay.startTime) * 30}
        >
          <div
            style={{
              position: 'absolute',
              left: `${overlay.position.x}%`,
              top: `${overlay.position.y}%`,
              fontSize: overlay.style.fontSize,
              color: overlay.style.color,
              fontFamily: 'system-ui, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              opacity: spring({
                frame: frame - overlay.startTime * 30,
                fps: 30,
                config: { damping: 200 },
              }),
            }}
          >
            {overlay.text}
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};