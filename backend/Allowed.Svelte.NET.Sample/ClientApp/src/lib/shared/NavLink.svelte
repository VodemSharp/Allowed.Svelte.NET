<script lang="ts">
    import {mdb} from "../../client/Variables";
    import {route} from "../../stores/RouterStores";

    export let nav: HTMLElement;
    export let path: string;

    function onNavigate() {
        if (window.innerWidth < 992)
            return new mdb.Collapse(nav);
    }
</script>

<a href="{path}" class="list-group-item list-group-item-action py-2 ripple" class:active={$route.path === path}
   on:click={onNavigate}>
    <slot/>
</a>