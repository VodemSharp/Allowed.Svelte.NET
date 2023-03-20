using Microsoft.AspNetCore.Mvc;
using Allowed.Svelte.NET.ActionResults;
using Allowed.Svelte.NET.Attributes;

namespace Allowed.Svelte.NET.Sample.Controllers;

[Route("/errors")]
public class ErrorController : ControllerBase
{
    [Route("404")]
    public SvelteView Error() => new();
}