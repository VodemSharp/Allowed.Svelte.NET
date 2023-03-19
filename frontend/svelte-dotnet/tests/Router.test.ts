import {describe, assert, it, expect} from 'vitest'
import {routerService} from "../src/lib/services/RouterService";

let routeKeys: string[] = [
    '/',
    '/about',
    '/users',
    '/users/{id}',
    '/orders/{id?}',
    '/payments/{id:byte}',
    '/faq/{*slug}'
];

let parsedRoutes: string[][] = [];

for (let i = 0; i < routeKeys.length; i++) {
    parsedRoutes[i] = routeKeys[i].split('/');
}

function getActivePage(path: string) {
    return routerService.getActivePage(parsedRoutes, path);
}

function getParameters(route: string, path: string) {
    return routerService.getParameters(route, path);
}

describe('RouterService', () => {
    it('simple', () => {
        assert.equal(getActivePage('/'), '/');
        assert.equal(getActivePage('/about'), '/about');
        assert.equal(getActivePage('/contacts'), undefined);
    });

    it('parametrized', () => {
        assert.equal(getActivePage('/users'), '/users');
        assert.equal(getActivePage('/users/1'), '/users/{id}');
        assert.equal(getActivePage('/orders'), '/orders/{id?}');
        assert.equal(getActivePage('/orders/1'), '/orders/{id?}');
        assert.equal(getActivePage('/payments'), undefined);

        assert.deepEqual(getParameters('/users/{id}', '/users/1'), {id: '1'});
        assert.deepEqual(getParameters('/orders/{id?}', '/orders'), {id: undefined});
        assert.deepEqual(getParameters('/orders/{id?}', '/orders/1'), {id: '1'});
    });

    it('parametrizedTyped', () => {
        assert.equal(getActivePage('/payments/1e2'), undefined);
        assert.equal(getActivePage('/payments/100'), '/payments/{id:byte}');
        assert.equal(getActivePage('/payments/256'), undefined);

        assert.deepEqual(getParameters('/payments/{id:byte}', '/payments/100'), {id: 100});
    });

    it('slug', () => {
        assert.equal(getActivePage('/faq/how-to-write-code/1'), '/faq/{*slug}');

        assert.deepEqual(getParameters('/faq/{*slug}', '/faq/how-to-write-code/1'), {slug: 'how-to-write-code/1'});
    });
})