using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Template.Controllers;

public class MainController : ControllerBase
{
    [SvelteRoute("/{counter:int?}", Page = "Index")]
    public SvelteView Index()
    {
        return new SvelteView();
    }
    
    [SvelteRoute("/about", Page = "About")]
    public SvelteView<object> About()
    {
        return new SvelteView<object>(new
        {
            Text = "Something about Svelte.NET"
        });
    }
}