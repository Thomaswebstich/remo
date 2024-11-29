import React, { useCallback } from 'react';
import { useVideoStore } from '../store/videoStore';
import { Music } from 'lucide-react';

export const AudioUploader: React.FC = () => {
  const { setAudioFile, project } = useVideoStore();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  }, [setAudioFile]);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Music className="mx-auto mb-4 text-gray-400" size={32} />
      {project.audioFile ? (
        <div>
          <p className="text-green-600 font-medium">
            {project.audioFile.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Drop another audio file to replace
          </p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600">
            Drag and drop an audio file here
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Supports MP3, WAV, and OGG formats
          </p>
        </div>
      )}
    </div>
  );
};