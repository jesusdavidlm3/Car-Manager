import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        rollupOptions: {
            external: [
                'sqlite3',
            ]
        },
        commonjsOptions: {
            dynamicRequireTargets: 'node_modules/sqlite3/*'
            // dynamicRequireTargets: 'node_modules/sqlite3/lib/sqlite3.js'
            // dynamicRequireTargets: 'node_modules/sqlite3/build/Release/node_sqlite3.node'
        },
    }
});
