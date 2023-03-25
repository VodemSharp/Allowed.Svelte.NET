﻿import {createRouteStore, createUrlStore, createPageStore, RouteStoreData} from "svelte-dotnet";
import type {UrlStore, PageStore} from "svelte-dotnet";
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