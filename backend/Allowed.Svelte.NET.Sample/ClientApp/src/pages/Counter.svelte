<script lang="ts">
    import {PageTitle} from "svelte-dotnet";

    export let initial: number = 0;

    let currentYear = new Date().getFullYear();

    const increment = () => {
        initial += 1;
    }
</script>

<PageTitle value="Counter"/>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Counter</h1>
            <p><a href="/counter/{currentYear}">Counter with initial value</a></p>
            <p>Current count: {initial}</p>
            <button class="btn btn-primary" on:click={increment}>
                Click me
            </button>
        </div>
    </div>
</div>
