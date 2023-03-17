<script>
    import Router from "../lib/components/routes/Router.svelte";
    import PageTitle from "../lib/components/head/PageTitle.svelte";
    import LayoutView from "../lib/components/layouts/LayoutView.svelte";
    import MainLayout from "../shared/MainLayout.svelte";
    import RouteView from "../lib/components/routes/RouteView.svelte";
    import {route, url} from "../stores/RouterStores";
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