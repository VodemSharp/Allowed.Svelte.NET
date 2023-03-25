using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Sample.Controllers;

[Route("users")]
public class UserController : ControllerBase
{
    [SvelteRoute(Page = "Users")]
    public SvelteView Users()
    {
        return new SvelteView();
    }
    
    [SvelteRoute("{skip}", Page = "Users")]
    public SvelteView UsersT()
    {
        return new SvelteView();
    }
}