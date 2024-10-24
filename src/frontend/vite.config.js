import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        manifest: true,
        rollupOptions: {
            input: {
                main: 'src/entrypoints/main.js'
            },
        },
    },
})