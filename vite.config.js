import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/rss-react-task1/',
  plugins: [tailwindcss(), react()],
});
