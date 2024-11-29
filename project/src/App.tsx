import React from 'react';
import { AudioUploader } from './components/AudioUploader';
import { MediaUploader } from './components/MediaUploader';
import { Timeline } from './components/Timeline';
import { Preview } from './components/Preview';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Music Video Editor</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <Preview />
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <AudioUploader />
            <MediaUploader />
          </div>
        </div>
        
        <Timeline />
      </div>
    </div>
  );
}

export default App;