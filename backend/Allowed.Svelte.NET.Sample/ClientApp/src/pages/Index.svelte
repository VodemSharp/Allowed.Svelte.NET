<script lang="ts">
    import svelteLogo from '../assets/svelte.svg';
    import Counter from "../lib/Counter.svelte";
    import {url} from "../stores/RouterStores";
    import {PageTitle} from "@dev/svelte-dotnet";

    export let counter: number;

    function goToAbout() {
        url.navigate('/about');
    }
</script>

<PageTitle value="Index" />
<main>
    <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/app/vite.svg" class="logo" alt="Vite Logo"/>
        </a>
        <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} class="logo svelte" alt="Svelte Logo"/>
        </a>
        <a href="https://dotnet.microsoft.com" target="_blank" rel="noreferrer">
            <img src="/app/dotnet.svg" class="logo" alt="DotNet Logo"/>
        </a>
    </div>
    <h1>Vite + Svelte + .NET</h1>

    <div class="card">
        <Counter counter="{counter}"/>
        <button on:click={goToAbout}>Go to about</button>
    </div>

    <p class="read-the-docs">
        Click on the Vite, Svelte and .NET logos to learn more
    </p>
</main>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
    }

    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }

    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }

    .read-the-docs {
        color: #888;
    }
</style>