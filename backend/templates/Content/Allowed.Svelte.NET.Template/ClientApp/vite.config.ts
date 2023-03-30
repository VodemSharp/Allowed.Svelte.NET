import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/app/',
    plugins: [svelte({
        preprocess: autoPreprocess(),
        experimental: {
            dynamicCompileOptions({filename, compileOptions}) {
                return {hydratable: true};
            }
        }
    })],
    ssr: {
        noExternal: true
    },
})
