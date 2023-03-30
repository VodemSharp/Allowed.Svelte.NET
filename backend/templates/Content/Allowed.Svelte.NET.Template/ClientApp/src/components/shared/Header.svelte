<script lang="ts">
    
    let menuActive: boolean = false;
    
    const burgerHandler = () => {
        menuActive = !menuActive;
    }
</script>

<header class="header" class:menu-active={menuActive}>
    <div class="header__bg"></div>
    <div class="header__body">
        <div class="container header__top">
            <a href="/" class="header__logo">
                <div class="main-logo">
                    <p>Allowed.Svelte.NET</p>
                    <p>Allowed.Svelte.NET</p>
                    <p>Allowed.Svelte.NET</p>
                </div>
            </a>
            <div class="burger" on:click={burgerHandler}>
                <div class="burger__body"></div>
            </div>
            <div class="main-menu ">
                <nav class="nav-list" on:click={() => {menuActive = false}}>
                    <a href="/" class="glitch-text nav-link" data-content="Intro">Intro</a>
                    <a href="/about" class="glitch-text nav-link" data-content="About">About</a>
                </nav>
            </div>
        </div>
    </div>
</header>