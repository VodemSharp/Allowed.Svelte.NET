<script lang="ts">
    import {page} from "../stores/RouterStores";
    import {onMount} from "svelte";
    import {PageTitle} from "svelte-dotnet";
    import type {AboutDto} from "../models/AboutDto";
    import type {AppServerData} from "../models/AppServerData";

    $: data = <AppServerData>$page.data;
    $: model = <AboutDto>data.model;

    onMount(async () => {
        await page.updateIsEmpty();
    });
</script>

<PageTitle value="About"/>

<main>
    <h1>About</h1>
    <p>{model?.text}</p>
    <p>{data.configuration?.apiConnection}</p>
    <p>
        <a href="/">Go to index</a>
    </p>
</main>