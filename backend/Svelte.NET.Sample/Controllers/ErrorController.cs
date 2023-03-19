using Microsoft.AspNetCore.Mvc;
using Svelte.NET.ActionResults;
using Svelte.NET.Attributes;

namespace Svelte.NET.Sample.Controllers;

[Route("/errors")]
public class ErrorController : ControllerBase
{
    [Route("404")]
    public SvelteView Error() => new();
}