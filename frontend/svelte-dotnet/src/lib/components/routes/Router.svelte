<script lang="ts">
    import {onMount} from "svelte";
    import {RouteStoreData} from "../../stores/RouteStore";

    export let route: RouteStoreData = new RouteStoreData();

    onMount(() => {
        document.addEventListener("click", function (e: Event) {
            const linkElement = (<HTMLElement>e.target).closest("a");

            if (linkElement) {
                const href = linkElement.getAttribute('href');
                const target = linkElement.getAttribute('target');

                if (target != '_blank' && href && (href.startsWith('/') || href.startsWith(window.location.host))) {
                    e.preventDefault();
                    history.pushState({}, '', href);
                }
            }
        });
    });
</script>

{#if route.path}
    <slot name="found"></slot>
{:else}
    <slot name="not-found"></slot>
{/if}