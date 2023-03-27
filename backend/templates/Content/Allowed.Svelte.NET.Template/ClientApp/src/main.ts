import './app.css'
import App from './App.svelte'
import {createStores} from "./stores/RouterStores";
import type {ServerData} from "svelte-dotnet";

declare global {
    interface Window {
        SVELTE_DOT_NET_STATE: ServerData
    }
}

createStores(window.location.href, window.SVELTE_DOT_NET_STATE);

const app = new App({
    target: document.getElementById('app'),
    hydrate: true
})

export default app
