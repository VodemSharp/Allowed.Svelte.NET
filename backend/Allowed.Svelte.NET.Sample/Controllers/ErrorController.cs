﻿using Allowed.Svelte.NET.ActionResults;
using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Sample.Controllers;

[Route("/errors")]
public class ErrorController : ControllerBase
{
    [Route("404")]
    public SvelteView Error() => new();
}