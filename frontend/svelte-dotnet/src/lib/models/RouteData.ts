import type { ComponentType } from "svelte";

export class RouteData {
    component: ComponentType  | undefined;
    layout: ComponentType  | undefined;

    public constructor(component: ComponentType  | undefined, layout: ComponentType  | undefined = undefined) {
        this.component = component;
        this.layout = layout;
    }
}