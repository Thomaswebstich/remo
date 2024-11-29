import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@remotion/player', '@remotion/media-utils'],
    exclude: ['remotion'],
  },
  build: {
    commonjsOptions: {
      include: [/@remotion\/*/],
    },
  },
});