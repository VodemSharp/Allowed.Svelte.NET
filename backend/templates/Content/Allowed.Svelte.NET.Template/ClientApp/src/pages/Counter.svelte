<script lang="ts">
    import {PageTitle} from "svelte-dotnet";

    export let counter: number = 0;

    const increment = () => {
        counter += 1;
    }
</script>

<PageTitle value="Counter"/>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Counter</h1>
            <p>Current count: {counter}</p>
            <button class="btn btn-primary" on:click={increment}>
                Click me
            </button>
        </div>
    </div>
</div>
