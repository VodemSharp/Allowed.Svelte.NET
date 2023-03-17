<script lang="ts">
    import PageTitle from "../lib/components/head/PageTitle.svelte";
    import {url, page} from "../stores/RouterStores";
    import {onMount} from "svelte";

    onMount(async () => {
        if (page.isDataEmpty()) await page.updateData();
    });

    function navigate() {
        url.navigate('/about');
    }
</script>

<PageTitle value="Index"/>
<p>Index - {$page.isSSR}</p>
<button on:click={navigate}>Navigate</button>
<a rel="external" href="/about">About</a>