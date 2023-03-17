using Microsoft.AspNetCore.Mvc;
using Svelte.NET.ActionResults;
using Svelte.NET.Attributes;

namespace Svelte.NET.Sample.Controllers;

[Route("/errors")]
public class ErrorController : ControllerBase
{
    [SvelteRoute("404", "shared/NotFound")]
    public async Task<SvelteView> Error()
    {
        return new SvelteView();
    }
}