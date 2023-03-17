// <auto-generated />
import Index from './pages/Index.svelte';
import About from './pages/About.svelte';
import AboutP from "./pages/AboutP.svelte";
import AboutK from "./pages/AboutK.svelte";
import AboutA from "./pages/AboutA.svelte";
import AboutIA from "./pages/AboutIA.svelte";
import Contacts from "./pages/Contacts.svelte";
import {RouteData} from "./lib";
import IndexLayout from "./shared/IndexLayout.svelte";

export const routes: Record<string, RouteData> = {
    '/': new RouteData(Index, IndexLayout),
    '/about': new RouteData(About),
    '/about/{id:number}': new RouteData(AboutP),
    '/about/key': new RouteData(AboutK),
    '/about/key/{*slug:string}': new RouteData(AboutA),
    '/about/{id:number}/{*slug:string}': new RouteData(AboutIA),
    '/contacts/{id:number?}': new RouteData(Contacts)
};