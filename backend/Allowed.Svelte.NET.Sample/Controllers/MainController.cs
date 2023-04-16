using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;
using Allowed.Svelte.NET.Sample.Data;
using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Sample.Controllers;

public class MainController : ControllerBase
{
    private readonly WeatherForecastService _forecastService;

    public MainController(WeatherForecastService forecastService)
    {
        _forecastService = forecastService;
    }

    [SvelteRoute("/", Page = "Index")]
    public SvelteView Index() => new();

    [SvelteRoute("/counter/{initial:int?}", Page = "Counter")]
    public SvelteView Counter() => new();

    [SvelteRoute("/fetchdata", Page = "FetchData")]
    public async Task<SvelteView> FetchData()
    {
        return new SvelteView<WeatherForecast[]>(
            await _forecastService.GetForecastAsync(DateOnly.FromDateTime(DateTime.Now)));
    }

    [SvelteRoute("/server", Page = "ServerSideData")]
    public SvelteView ServerSideData() => new();

    [SvelteRoute("/signin", Page = "SignIn", Layout = "SignInLayout")]
    public SvelteView SignIn() => new();
}