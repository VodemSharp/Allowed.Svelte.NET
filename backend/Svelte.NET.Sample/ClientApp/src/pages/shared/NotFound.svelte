<script>
    import {LayoutView, PageTitle} from "@dev/svelte-dotnet";
    import MainLayout from "../../layouts/MainLayout.svelte";
</script>

<PageTitle value="Not found"/>
<LayoutView layout="{MainLayout}">
    <p role="alert">Sorry, there's nothing at this address.</p>
</LayoutView>