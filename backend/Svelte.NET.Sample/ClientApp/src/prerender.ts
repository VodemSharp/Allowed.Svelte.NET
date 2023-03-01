import type { create_ssr_component } from 'svelte/internal';
import App from "./App.svelte";
type ServerSideComponent = ReturnType<typeof create_ssr_component>;
const ServerApp = <unknown>App as ServerSideComponent;

export async function render(url, props) {
    return ServerApp.render({url, ssrData: props});
}