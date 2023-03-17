<script lang="ts">
    import {page, url} from "../stores/RouterStores";
    import {onMount} from "svelte";

    function goToIndex() {
        url.navigate('/');
    }

    onMount(async () => {
        if (page.isDataEmpty()) await page.updateData();
    });
</script>

<p>About</p>
<p><a href="/">Index link</a></p>
<button on:click={goToIndex}>Go to Index</button>
{#if $page.data}
    <p>{$page.data.text}</p>
{/if}