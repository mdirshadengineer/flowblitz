import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { createFilter } from '@rollup/pluginutils';
import nodeResolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Exclude test/storybook files
    {
      name: 'exclude-files',
      transform(code, id) {
        const filter = createFilter(['**/*.stories.tsx', '**/*.test.tsx']);
        return filter(id) ? null : code;
      }
    },
    nodeResolve({
      dedupe: ['react', 'react-dom']
    })
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'design-system',
      fileName: 'design-system',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        manualChunks: undefined,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: chunkInfo => {
          // Handle root entry point
          if (chunkInfo.name === 'index') return 'design-system.js';

          // Flatten nested paths (e.g., "components/buttons/button" → "button")
          const componentName = chunkInfo.name
            .split('/')
            .filter(part => part !== 'components') // Remove "components" segment
            .pop(); // Take the last folder name

          return `components/${componentName}/index.js`;
        },
        chunkFileNames: chunkInfo => {
          const componentName = chunkInfo.name
            .split('/')
            .filter(part => part !== 'components')
            .pop();
          return `components/${componentName}/[name].js`;
        },
        assetFileNames: assetInfo => {
          const componentName =
            assetInfo.name
              ?.split('/')
              .filter(part => part !== 'src' && part !== 'components') // Clean path
              .slice(0, -1)
              .pop() || 'common';
          return `components/${componentName}/[name].[ext]`;
        }
      }
    }
  },
  publicDir: 'public'
});
