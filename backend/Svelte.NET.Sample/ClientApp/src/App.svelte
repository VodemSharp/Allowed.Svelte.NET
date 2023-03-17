<script lang="ts">
    import {Router} from "@dev/svelte-dotnet";
    import {RouteView} from "@dev/svelte-dotnet";
    import {url, route} from "./stores/RouterStores";
    import MainLayout from "./layouts/MainLayout.svelte";
    import NotFound from "./pages/shared/NotFound.svelte";
</script>

<Router route="{$route}">
    <div slot="found">
        <RouteView route="{$route}" url="{$url}" defaultLayout="{MainLayout}"/>
    </div>
    <div slot="not-found">
        <NotFound/>
    </div>
</Router>