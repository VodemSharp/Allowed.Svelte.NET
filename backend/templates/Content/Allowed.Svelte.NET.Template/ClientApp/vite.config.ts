import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/app/',
    plugins: [svelte({
        experimental: {
            dynamicCompileOptions({filename, compileOptions}) {
                return {hydratable: true};
            }
        }
    })]
})
