import {writable} from "svelte/store";
import type {Readable} from "svelte/store";
import {routerService} from "../services/RouterService";
import type {RouteData} from "../models/RouteData";

export class RouteStoreData {
    path: string | undefined = undefined;
    route: RouteData | undefined = undefined;

    constructor(path: string | undefined = undefined,
                route: RouteData | undefined = undefined) {
        this.path = path;
        this.route = route;
    }
}

export function createRouteStore(routes: Record<string, RouteData>, url: Readable<URL>): Readable<RouteStoreData> {
    const routeData = new RouteStoreData();
    const {subscribe, set} = writable(routeData);

    let parsedRoutes: string[][] = [];
    let routeKeys = Object.keys(routes);

    for (let i = 0; i < routeKeys.length; i++) {
        parsedRoutes[i] = routeKeys[i].split('/');
    }

    url.subscribe(x => {
        const path = routerService.getActivePage(parsedRoutes, x.pathname);
        set(new RouteStoreData(path, path == undefined ? undefined : routes[path]));
    });

    return {
        subscribe
    };
}
