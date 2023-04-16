<script>
    import Sidebar from "../lib/shared/Sidebar.svelte";
    import Navbar from "../lib/shared/Navbar.svelte";
</script>

<header>
    <Sidebar/>
    <Navbar/>
</header>

<main style="margin-top: 58px">
    <div class="container pt-4">
        <slot/>
    </div>
</main>

<style>
    @media (min-width: 991.98px) {
        main {
            padding-left: 240px;
        }
    }

    :global body {
        background-color: #fbfbfb!important;
    }
</style>