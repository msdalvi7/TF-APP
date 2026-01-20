
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Vite handles replacements during build. 
    // This ensures process.env.API_KEY and process.env exist in the browser.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env': '({})'
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
