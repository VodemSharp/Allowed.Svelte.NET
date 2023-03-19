// <auto-generated />
import IndexLayout from './layouts/IndexLayout.svelte';
import About from './pages/About.svelte';
import Index from './pages/Index.svelte';
import {RouteData} from '@dev/svelte-dotnet';

export const routes = {
    '/{counter:double?}': new RouteData(Index, IndexLayout),
    '/about': new RouteData(About)
}