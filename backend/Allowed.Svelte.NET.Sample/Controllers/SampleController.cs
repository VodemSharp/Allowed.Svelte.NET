using Microsoft.AspNetCore.Mvc;
using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;

namespace Allowed.Svelte.NET.Sample.Controllers;

public class SampleController : ControllerBase
{
    [SvelteRoute("/{counter:double?}", "Index", Layout = "IndexLayout")]
    public async Task<SvelteView> Index()
    {
        return new SvelteView();
    }

    [SvelteRoute("/about", "About")]
    public async Task<SvelteView<object>> About()
    {
        return new SvelteView<object>(new
        {
            Text = "test"
        });
    }
    
    // [SvelteRoute("/about/key", "AboutK")]
    // public async Task<SvelteView<object>> AboutK()
    // {
    //     return new SvelteView<object>(new
    //     {
    //         InnerData = "InnerData"
    //     });
    // }
    //
    // [SvelteRoute("/about/{id}/{key}", "AboutP")]
    // public async Task<SvelteView<object>> AboutP(int id, string key)
    // {
    //     return new SvelteView<object>(new
    //     {
    //         InnerData = "InnerData"
    //     });
    // }
    //
    //
    // [SvelteRoute("/about/{*all}", "AboutP")]
    // public async Task<SvelteView<object>> AboutA(string all)
    // {
    //     return new SvelteView<object>(new
    //     {
    //         InnerData = "InnerData"
    //     });
    // }
}