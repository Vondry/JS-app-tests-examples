import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['../shared-code/tests/setupTests.ts']
    }
});
