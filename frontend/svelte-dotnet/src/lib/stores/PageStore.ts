import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {UrlStore} from "./UrlStore";
import {ServerData} from "../models/ServerData";

export class PageStoreData {
    isSSR: boolean = false;
    href: string = '';
    data: ServerData = new ServerData();

    constructor(ssrData: ServerData) {
        this.data = ssrData;
        this.isSSR = typeof window == 'undefined';
    }
}

export interface PageStore extends Writable<PageStoreData> {
    isDataModelEmpty: { (): boolean };
    updateDataModel: { (init?: RequestInit): Promise<void> };
    updateIsEmpty: { (init?: RequestInit): Promise<void> };
}

export const defaultRequestInit: RequestInit = {
    method: "GET",
    headers: {
        "svdn-data-only": "1"
    }
}

export function createPageStore(ssrData: ServerData, url: UrlStore): PageStore {
    const page = new PageStoreData(ssrData);
    const {subscribe, set, update} = writable<PageStoreData>(page);

    url.subscribe(x => {
        update(p => {
            if (p.href && p.href != x.href) {
                p.data.model = undefined;
            }

            p.href = x.href;
            return p;
        });
    });

    const isDataModelEmpty = () => {
        return !page.data.model;
    };

    const updateDataModel = async (init: RequestInit = defaultRequestInit) => {
        const data = await (await fetch(page.href, init)).json();

        update(p => {
            p.data.model = data;
            return p;
        });
    };

    const updateIsEmpty = async (init: RequestInit = defaultRequestInit) => {
        if (isDataModelEmpty()) await updateDataModel(init);
    };

    return {
        set,
        subscribe,
        update,
        isDataModelEmpty,
        updateDataModel,
        updateIsEmpty
    };
}
