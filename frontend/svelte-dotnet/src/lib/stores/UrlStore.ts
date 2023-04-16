import {derived, writable} from 'svelte/store'
import type {Readable} from "svelte/store";

const absoluteRegex = new RegExp('^(?:[a-z+]+:)?//', 'i');

export interface UrlStore extends Readable<URL> {
    navigate?: { (url: string): void };
}

export function createUrlStore(ssrUrl: string): UrlStore {
    if (typeof window === 'undefined') {
        return {
            subscribe: writable(new URL(ssrUrl)).subscribe
        };
    }

    const href = writable(window.location.href);
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    const updateHref = () => href.set(window.location.href);

    history.pushState = function () {
        // @ts-ignore
        originalPushState.apply(this, arguments);
        updateHref();
    }

    history.replaceState = function () {
        // @ts-ignore
        originalReplaceState.apply(this, arguments);
        updateHref();
    }

    window.addEventListener('popstate', updateHref);
    window.addEventListener('hashchange', updateHref);

    return {
        subscribe: derived(href, ($href) => new URL($href)).subscribe,
        navigate: function (url: string) {
            if (absoluteRegex.test(url) && new URL(url).host != window.location.host)
                window.location.href = url;
            else
                history.pushState({}, '', url);
        }
    };
}