<script lang="ts">
    import type { ComponentType } from "svelte";

    export let layout: ComponentType;
</script>

<svelte:component this="{layout}">
    <slot/>
</svelte:component>