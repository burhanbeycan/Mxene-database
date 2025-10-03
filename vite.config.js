import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: Update 'base' with your GitHub repository name
  // For example: '/mxene-database/' if your repo is github.com/username/mxene-database
  // Use '/' if deploying to root domain
  base: '/Mxene-database/',  // ⚠️ Change this to match your repo name!
  
  plugins: [react(),tailwindcss()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Build optimizations
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts'],
          'csv-vendor': ['papaparse'],
        },
      },
    },
  },
  
  // Development server
  server: {
    port: 5173,
    host: true,
    open: true,
  },
})
