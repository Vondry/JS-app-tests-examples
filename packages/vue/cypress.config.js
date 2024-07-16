import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // This PORT must be in sync with the port defined in package.json
        baseUrl: 'http://localhost:8000'
    }
});
