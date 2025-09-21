import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagemin({
      // Enable WebP conversion
      webp: {
        quality: 85,
      },
      // Optimize existing formats
      mozjpeg: {
        quality: 85,
      },
      pngquant: {
        quality: [0.6, 0.8],
      },
      // Convert to modern formats
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['react-bootstrap', 'framer-motion'],
          'icons-vendor': ['react-icons'],
          'parallax-vendor': ['react-scroll-parallax'],
        },
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Minify for smaller bundles (using esbuild - built into Vite)
    minify: 'esbuild',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-bootstrap',
      'react-icons/fa',
      'react-scroll-parallax',
    ],
  },
})
