import { defineConfig } from 'vite';

export default defineConfig({
  base: '/static/dist', // Replace 'my-vite-app' with your repository name
  build: {
    outDir: 'static/dist',
    rollupOptions: {
      input: {
        main: './src/main.js',
      },
      output: {
        entryFileNames: 'compiledJS.js',
        assetFileNames: ({ name, type }) => {
          if (type === 'asset' && name) {
            if (/.(jpg|jpeg|png|gif|svg|webp)$/i.test(name)) {
              return 'images/[name]-[hash][extname]';
            }

            if (name.endsWith('.css')) {
              return 'compiledCSS.[ext]';
            }
          }
        },
      },
    },
  },
});
