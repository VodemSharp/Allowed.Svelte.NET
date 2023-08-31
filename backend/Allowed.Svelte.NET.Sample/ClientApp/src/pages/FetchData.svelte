<script lang="ts">
    import {PageTitle} from "svelte-dotnet";
    import {page} from "../stores/RouterStores";
    import {WeatherForecast} from "../models/WeatherForecast";
    import {onMount} from "svelte";

    $: forecasts = <WeatherForecast[]>$page.data.model;

    onMount(async () => {
        await page.updateIsEmpty();
    });
</script>

<PageTitle value="Weather forecast"/>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from a service.</p>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Temp. (C)</th>
                    <th scope="col">Temp. (F)</th>
                    <th scope="col">Summary</th>
                </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                {#if forecasts}
                    {#each forecasts as forecast}
                        <tr>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    {/each}
                {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    th[scope="col"] {
        font-weight: bold;
    }
</style>