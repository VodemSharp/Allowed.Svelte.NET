using Microsoft.AspNetCore.Mvc;
using Svelte.NET.ActionResults;
using Svelte.NET.Attributes;

namespace Svelte.NET.Sample.Controllers;

public class SampleController : ControllerBase
{
    [SvelteRoute("/", "Index")]
    public async Task<SvelteView> Index()
    {
        return new SvelteView();
    }
    
    [SvelteRoute("/about", "About")]
    public async Task<SvelteView<object>> About()
    {
        return new SvelteView<object>(new
        {
            InnerData = "InnerData"
        });
    }
}