<script>
    import {PageTitle} from "svelte-dotnet";
</script>

<PageTitle value="Index"/>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Demo</h1>
            <p><a target="_blank"
                  href="https://github.com/VodemSharp/Allowed.Svelte.NET/tree/main/backend/Allowed.Svelte.NET.Sample">Code
                of this app</a></p>
            <p>The demo showcases the following features:</p>
            <ul>
                <li>Routing</li>
                <li>
                    Server-side rendering and hydration
                    <ul>
                        <li><a href="/counter">From the URL</a></li>
                        <li><a href="/fetchdata">Using Backend model</a></li>
                        <li><a href="/server">Using appsettings.json data</a></li>
                    </ul>
                </li>
                <li><a href="/signin">Custom layout</a></li>
            </ul>
        </div>
    </div>
</div>