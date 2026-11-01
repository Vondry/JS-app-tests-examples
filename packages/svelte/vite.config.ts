import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        svelteTesting()
    ],
    // @ts-ignore
    test: {
        cache: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts']
    }
});
