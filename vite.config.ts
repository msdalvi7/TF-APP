import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Only inject the specific keys needed to avoid serializing the entire Node process.env object
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Fallback for libraries that expect 'process' to be defined
    'process.env': '{}'
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});