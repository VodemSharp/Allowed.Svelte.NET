<script lang="ts">
    import type { ComponentType } from "svelte";
    import { routerService } from "../../services/RouterService";
    import type { RouteStoreData } from "../../stores/RouteStore";

    export let defaultLayout: ComponentType | undefined;
    export let route: RouteStoreData;
    export let url: URL;

    $: props = routerService.getParameters(route?.path!, url?.pathname);
</script>

{#if route && route.route}
    {#if route.route.layout}
        <svelte:component this="{route.route.layout}">
            <svelte:component this="{route.route.component}" {...props} />
        </svelte:component>
    {:else if defaultLayout}
        <svelte:component this="{defaultLayout}">
            <svelte:component this="{route.route.component}" {...props} />
        </svelte:component>
    {:else}
        <svelte:component this="{route.route.component}" {...props} />
    {/if}
{/if}
