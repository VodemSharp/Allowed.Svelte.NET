<script lang="ts">
    import {page} from "../stores/RouterStores";
    import {onMount} from "svelte";
    import {PageTitle} from "@dev/svelte-dotnet";
    import type {AboutDto} from "../models/AboutDto";

    $: data = <AboutDto>$page.data;

    onMount(async () => {
        if (page.isDataEmpty()) await page.updateData();
    });
</script>

<PageTitle value="About"/>

<main>
    <h1>About</h1>

    {#if data && data.text}
        <p>{data.text}</p>
    {/if}

    <p>
        <a href="/">Go to index</a>
    </p>
</main>

<style>

</style>