import {createPageStore, createUrlStore, createRouteStore, RouteStoreData} from "../lib";
import type {UrlStore, PageStore} from "../lib";
import {routes} from "../routes";
import type {Readable} from "svelte/store";

export let url: UrlStore;
export let page: PageStore;
export let route: Readable<RouteStoreData>;

export function createStores(ssrUrl: string, ssrData: object) {
    url = createUrlStore(ssrUrl);
    page = createPageStore(ssrData, url);
    route = createRouteStore(routes, url);
}