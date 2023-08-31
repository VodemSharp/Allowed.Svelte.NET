<script lang="ts">
    import NavLink from "./NavLink.svelte";

    let nav: HTMLElement;
</script>

<nav bind:this={nav} id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
    <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
            <NavLink path="/" nav="{nav}">
                <i class="fas fa-home fa-fw me-3"></i>
                <span>Home</span>
            </NavLink>
            <NavLink path="/counter" nav="{nav}">
                <i class="fas fa-plus fa-fw me-3"></i>
                <span>Counter</span>
            </NavLink>
            <NavLink path="/fetchdata" nav="{nav}">
                <i class="fas fa-chart-bar fa-fw me-3"></i>
                <span>Fetch data</span>
            </NavLink>
        </div>
    </div>
</nav>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        padding: 58px 0 0; /* Height of navbar */
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
        width: 240px;
        z-index: 600;
    }

    @media (max-width: 991.98px) {
        .sidebar {
            width: 100%;
        }
    }
</style>