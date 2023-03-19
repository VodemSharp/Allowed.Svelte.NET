<script lang="ts">
    import {page} from "../stores/RouterStores";
    import {onMount} from "svelte";
    import {PageTitle} from "@dev/svelte-dotnet";
    import {AboutDto} from "../models/AboutDto";

    $: data = <AboutDto>$page.data;
    
    onMount(async () => {
        if (page.isDataEmpty()) await page.updateData();
    });
</script>

<PageTitle value="About"/>

<main>
    <h1>About</h1>

    <p></p>
    {#if data && data.text}
        <p>Data: {data.text}</p>
    {/if}
    
    <p>
        <a href="/">Index link</a>
    </p>
</main>

<style>
    
</style>