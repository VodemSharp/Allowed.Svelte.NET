<script lang="ts">
    import PageTitle from "../lib/components/head/PageTitle.svelte";
    import {url, page} from "../stores/RouterStores";
    import {onMount} from "svelte";

    function navigate() {
        url.navigate('/about');
    }

    onMount(() => {
        console.log(page.isDataModelEmpty());
    });
</script>

<PageTitle value="Index"/>
<p>Index - {$page.isSSR}</p>
<p>
    <button on:click={navigate}>Navigate</button>
</p>