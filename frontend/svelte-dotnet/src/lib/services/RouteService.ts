import {numberTypes} from "../constants/NumberType";

export class RouteService {
    isParameter(x: string) {
        return x[0] == '{' && x[x.length - 1] == '}';
    }

    countNecessaryParts(route: string[]) {
        let counter = route.length;
        for (let i = route.length - 1; i >= 0; i--) {
            if (!route[i].endsWith('?}') && !route[i].startsWith('{*'))
                break;

            counter--;
        }

        return counter;
    }

    getSuitableByLength(routes: string[][], route: string[]) {
        return routes.filter(r => this.countNecessaryParts(r) <= route.length && (r.length >= route.length
            || r.some(x => x.indexOf('{*') > -1)));
    }

    getParameterParts(routePart: string) {
        const parameter = routePart.substring(1, routePart.length - 1);
        const parameterParts = parameter.split(':');
        const type = parameterParts.length == 2 ? parameterParts[1].replace('?', '') : undefined;
        return {parameterParts, type};
    }

    isValidType(routePart: string, value: string) {
        const {parameterParts, type} = this.getParameterParts(routePart);

        if (parameterParts[0][0] != '*' && numberTypes.some(t => t.name == type)) {
            const numberType = numberTypes.filter(t => t.name == type)[0];
            const numberValue = Number(value);

            return value.indexOf('e') == -1 && !isNaN(numberValue)
                && (numberType.real || value.indexOf('.') == -1 && !numberType.real)
                && numberValue >= numberType.min && numberValue <= numberType.max;
        }

        return true;
    }

    getSuitableByContent(routes: string[][], route: string[]) {
        for (let i = 0; i < route.length; i++) {
            for (let j = 0; j < routes.length; j++) {
                if (i < routes[j].length && (!this.isParameter(routes[j][i]) && route[i] != routes[j][i]
                    || this.isParameter(routes[j][i]) && route[i] != '' && !this.isValidType(routes[j][i], route[i]))) {
                    routes = routes.filter(r => routes.indexOf(r) != j);
                    j--;
                }
            }
        }

        return routes;
    }

    countFirstNotParameter(route: string[]) {
        let counter = 0;
        for (let i = 0; i < route.length; i++) {
            if (this.isParameter(route[i]))
                break;
            counter++;
        }

        return counter;
    }

    getBestComparison(routes: string[][]) {
        let bestRoute = routes[0];
        let bestRouteValue = this.countFirstNotParameter(routes[0]);

        for (let i = 1; i < routes.length; i++) {
            let routeValue = this.countFirstNotParameter(routes[i]);
            if (routeValue > bestRouteValue) {
                bestRoute = routes[i];
                bestRouteValue = routeValue;
            }
        }

        return bestRoute;
    }

    getActivePage(routes: string[][], pathname: string) {
        const route = pathname.split('/');

        let result = this.getSuitableByLength(routes, route);
        result = this.getSuitableByContent(result, route);

        if (result.length == 0)
            return undefined;

        return this.getBestComparison(result).join('/');
    }

    getParameters(route: string, pathname: string) {
        const routeParts = route.split('/');
        const parts = pathname.split('/');
        const result: Record<string, any> = {};
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];

            if (this.isParameter(routePart)) {
                const {parameterParts, type} = this.getParameterParts(routePart);

                if (parameterParts[0][0] == '*') {
                    result[parameterParts[0].substring(1)] = i < parts.length ? parts.slice(i).join('/') : undefined;
                } else {
                    if (numberTypes.some(t => t.name == type))
                        result[parameterParts[0]] = i < parts.length ? Number(parts[i]) : 0;
                    else
                        result[parameterParts[0]] = i < parts.length ? parts[i] : undefined;
                }
            }
        }

        return result;
    }
}

export const routerService = new RouteService();