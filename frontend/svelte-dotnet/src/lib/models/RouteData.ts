export class RouteData {
    component: object | undefined;
    layout: object | undefined;

    public constructor(component: object | undefined, layout: object | undefined = undefined) {
        this.component = component;
        this.layout = layout;
    }
}