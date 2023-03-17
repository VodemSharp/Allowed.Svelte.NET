import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {UrlStore} from "./UrlStore";

export class PageStoreData {
    isSSR: boolean = false;
    isFromSSR: boolean = false;
    href: string = '';
    data: object = {};

    constructor(data: object, isFromSSR: boolean) {
        this.data = data;
        this.isFromSSR = isFromSSR;
        this.isSSR = typeof window == 'undefined';
    }
}

export interface PageStore extends Writable<PageStoreData> {
    isDataEmpty: { (): boolean };
    updateData: { (): Promise<void> };
}

export const defaultRequestInit: RequestInit = {
    method: "GET",
    headers: {
        "Svdn-Data-Only": "1"
    }
}

export function createPageStore(ssrData: object, url: UrlStore): PageStore {
    const page = new PageStoreData(ssrData, true);
    const {subscribe, set, update} = writable<PageStoreData>(page);

    url.subscribe(x => {
        update(p => {
            if (p.href && p.href != x.href)
                p.data = {};

            p.href = x.href;
            return p;
        });
    });

    return {
        set,
        subscribe,
        update,
        isDataEmpty: () => {
            return Object.keys(page.data).length == 0;
        },
        updateData: async (init: RequestInit = defaultRequestInit) => {
            const data = await (await fetch(page.href, init)).json();

            update(p => {
                p.data = data;
                return p;
            });
        }
    };
}
