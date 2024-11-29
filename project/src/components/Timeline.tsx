import React from 'react';
import { useVideoStore } from '../store/videoStore';
import { Music, Image, Type } from 'lucide-react';

export const Timeline: React.FC = () => {
  const { project, removeMedia } = useVideoStore();
  const totalDuration = project.duration;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex gap-2 items-center mb-4">
        <Music className="text-white" size={20} />
        <div className="h-8 bg-blue-500 rounded flex-grow px-3 flex items-center text-white">
          {project.audioFile?.name || 'No audio file'}
        </div>
      </div>
      
      <div className="space-y-2">
        {project.media.map((media, index) => {
          const width = `${(media.duration / totalDuration) * 100}%`;
          const left = `${((index * media.duration) / totalDuration) * 100}%`;
          
          return (
            <div key={media.id} className="relative h-8">
              <div
                className="absolute flex gap-2 items-center group"
                style={{ width, left }}
              >
                {media.type === 'image' ? (
                  <Image className="text-white" size={20} />
                ) : (
                  <Type className="text-white" size={20} />
                )}
                <div className="h-8 bg-green-500 rounded flex-grow group-hover:bg-green-400 transition-colors flex items-center px-3">
                  <span className="text-white text-sm truncate">
                    {media.transition} transition
                  </span>
                  <button
                    onClick={() => removeMedia(media.id)}
                    className="ml-auto text-white opacity-0 group-hover:opacity-100 hover:text-red-200 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Timeline markers */}
      <div className="mt-4 border-t border-gray-700 pt-2">
        <div className="flex justify-between text-gray-400 text-sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{i * 10}s</span>
          ))}
        </div>
      </div>
    </div>
  );
};