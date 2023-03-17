import {createRouteStore, createUrlStore, createPageStore, RouteStoreData} from "@dev/svelte-dotnet";
import type {UrlStore, PageStore} from "@dev/svelte-dotnet";
import {routes} from "../routers";
import type {Readable} from "svelte/store";

export let url: UrlStore;
export let page: PageStore;
export let route: Readable<RouteStoreData>;

export function createStores(ssrUrl: string, ssrData: object) {
    url = createUrlStore(ssrUrl);
    page = createPageStore(ssrData, url);
    route = createRouteStore(routes, url);
}