<script lang="ts">
    import {page} from "../stores/RouterStores";
    import {onMount} from "svelte";
    import {PageTitle} from "svelte-dotnet";
    import type {AboutDto} from "../models/AboutDto";

    $: data = <AboutDto>$page.data.model;
    
    onMount(async () => {
        await page.updateIsEmpty();
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