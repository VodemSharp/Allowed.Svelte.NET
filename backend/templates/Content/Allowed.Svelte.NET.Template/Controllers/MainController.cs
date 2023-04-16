using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;
using Allowed.Svelte.NET.Template.Data;
using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Template.Controllers;

public class MainController : ControllerBase
{
    private readonly WeatherForecastService _forecastService;

    public MainController(WeatherForecastService forecastService)
    {
        _forecastService = forecastService;
    }

    [SvelteRoute("/", Page = "Index")]
    public SvelteView Index()
    {
        return new SvelteView();
    }

    [SvelteRoute("/counter", Page = "Counter")]
    public SvelteView Counter()
    {
        return new SvelteView();
    }

    [SvelteRoute("/fetchdata", Page = "FetchData")]
    public async Task<SvelteView> FetchData()
    {
        return new SvelteView<WeatherForecast[]>(
            await _forecastService.GetForecastAsync(DateOnly.FromDateTime(DateTime.Now)));
    }
}