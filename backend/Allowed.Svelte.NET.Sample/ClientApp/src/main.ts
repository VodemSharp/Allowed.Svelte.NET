import 'mdb-ui-kit/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.svelte'
import {createStores} from "./stores/RouterStores";
import type {ServerData} from "svelte-dotnet";
import {setMdb} from "./client/Variables";

// @ts-ignore
import * as mdb from 'mdb-ui-kit/js/mdb.min.js';

declare global {
    interface Window {
        SVELTE_DOT_NET_STATE: ServerData
    }
}

createStores(window.location.href, window.SVELTE_DOT_NET_STATE);
setMdb(mdb);

const app = new App({
    target: <HTMLElement>document.getElementById('app'),
    hydrate: true
})

export default app
