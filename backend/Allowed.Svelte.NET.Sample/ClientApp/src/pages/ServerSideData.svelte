<script lang="ts">
    import {PageTitle} from "svelte-dotnet";
    import {page} from "../stores/RouterStores.js";
    import {AppServerData} from "../models/AppServerData";

    $: data = <AppServerData>$page.data;
</script>

<PageTitle value="Server side data"/>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Server side data</h1>
            <p>{data.configuration.myData}</p>
        </div>
    </div>
</div>