using Microsoft.AspNetCore.Mvc;
using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;

namespace Allowed.Svelte.NET.Sample.Controllers;

public class SampleController : ControllerBase
{
    [SvelteRoute("/{counter:double?}", Page = "Index", Layout = "IndexLayout")]
    public SvelteView Index()
    {
        return new SvelteView();
    }

    [SvelteRoute("/about", Page = "About")]
    public SvelteView<object> About()
    {
        return new SvelteView<object>(new
        {
            Text = "test"
        });
    }
}