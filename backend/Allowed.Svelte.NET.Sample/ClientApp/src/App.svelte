<script lang="ts">
    import {Router, RouteView, PageTitle, LayoutView} from "@dev/svelte-dotnet";
    import {} from "@dev/svelte-dotnet";
    import {url, route} from "./stores/RouterStores";
    import MainLayout from "./layouts/MainLayout.svelte";
</script>

<Router route="{$route}">
    <div slot="found">
        <RouteView route="{$route}" url="{$url}" defaultLayout="{MainLayout}"/>
    </div>
    <div slot="not-found">
        <PageTitle value="Not found"/>
        <LayoutView layout="{MainLayout}">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </div>
</Router>