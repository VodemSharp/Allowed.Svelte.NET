// <auto-generated />
import Counter from './pages/Counter.svelte';
import FetchData from './pages/FetchData.svelte';
import Index from './pages/Index.svelte';
import {RouteData} from 'svelte-dotnet';

export const routes = {
    '/': new RouteData(Index),
    '/counter': new RouteData(Counter),
    '/fetchdata': new RouteData(FetchData)
}