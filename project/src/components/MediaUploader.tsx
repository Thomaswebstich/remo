import React, { useCallback } from 'react';
import { useVideoStore } from '../store/videoStore';
import { Upload } from 'lucide-react';

const TRANSITION_TYPES = ['fade', 'slide', 'zoom'] as const;

export const MediaUploader: React.FC = () => {
  const { addMedia } = useVideoStore();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const randomTransition = TRANSITION_TYPES[Math.floor(Math.random() * TRANSITION_TYPES.length)];
        addMedia({
          id: Math.random().toString(),
          type: 'image',
          url: URL.createObjectURL(file),
          duration: 5,
          transition: randomTransition,
        });
      }
    });
  }, [addMedia]);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload className="mx-auto mb-4 text-gray-400" size={32} />
      <p className="text-gray-600">
        Drag and drop images here to create your slideshow
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Images will automatically get random transitions
      </p>
    </div>
  );
};