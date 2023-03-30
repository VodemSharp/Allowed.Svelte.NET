<script lang="ts">
    import Counter from "../lib/Counter.svelte";
    import {url} from "../stores/RouterStores";
    import {PageTitle} from "svelte-dotnet";
    import {dotnetLogo, svelteLogo, viteLogo} from "../assets/img";

    export let counter: number;

    function goToAbout() {
        url.navigate('/about');
    }
</script>

<PageTitle value="Index"/>

<div class="section intro-section">
    <div class="section__body container">
        
        <h1 class="glitch-text glitch-text-infinite intro__title" data-content="Vite + Svelte + .NET">
            Vite + Svelte + .NET
        </h1>
        
        <div class="intro__row">
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <img src={viteLogo} class="logo" alt="Vite Logo"/>
            </a>
            <a href="https://svelte.dev" target="_blank" rel="noreferrer">
                <img src={svelteLogo} class="logo svelte" alt="Svelte Logo"/>
            </a>
            <a href="https://dotnet.microsoft.com" target="_blank" rel="noreferrer">
                <img src={dotnetLogo} class="logo" alt="DotNet Logo"/>
            </a>
        </div>
        
        <p class="intro__sub">
            Click on the Vite, Svelte and .NET logos to learn more
        </p>

        <div class="intro__card">
            <Counter counter="{counter}"/>
            <button class="m-btn" on:click={goToAbout}><span>Go to about</span></button>
        </div>
    </div>

</div>

<style lang="scss">
  .section__body {
    min-height: 100vh;
    justify-content: center;
  }
  
  .intro {
    &__title {
      margin-bottom: 20px;
    }
    &__row {}
    &__card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;
      row-gap: 10px;
      max-width: 500px;
      width: 100%;
    }
    &__sub {
      color: #ccc;
      margin: 30px 0;
    }
  }

  .logo {
    height: 10em;
    padding: 1.5em;
    will-change: filter;
    transition: all 0.3s ease-in-out;
    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
      transform: rotate(-10deg);
    }
    &.svelte:hover {
      filter: drop-shadow(0 0 2em #ff3e00aa);
    }
  }
</style>