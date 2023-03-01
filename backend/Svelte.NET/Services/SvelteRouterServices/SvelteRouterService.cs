﻿using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Svelte.NET.Attributes;
using Svelte.NET.Options;

namespace Svelte.NET.Services.SvelteRouterServices;

public class SvelteRouterService : ISvelteRouterService
{
    private readonly IWebHostEnvironment _environment;
    private readonly SvelteRouterOptions _options;

    public SvelteRouterService(IWebHostEnvironment environment, IOptions<SvelteRouterOptions> options)
    {
        _environment = environment;
        _options = options.Value;
    }

    public async Task BuildRouter()
    {
        var importBuilder = new StringBuilder();
        var routesBuilder = new StringBuilder();
        var resultBuilder = new StringBuilder();

        var methods = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(x => x.GetTypes())
            .Where(x => x.IsClass)
            .SelectMany(t => t.GetMethods())
            .Where(m => m.GetCustomAttributes(typeof(SvelteRouteAttribute), false).Length > 0)
            .ToArray();

        foreach (var method in methods)
        {
            var attributes = method.GetCustomAttributes(typeof(SvelteRouteAttribute), false)
                .Cast<SvelteRouteAttribute>().ToArray();

            foreach (var attribute in attributes)
            {
                var componentName = attribute.ComponentName ?? attribute.Page;

                importBuilder.AppendLine(
                    $"import {componentName} from '../{_options.PagesDirectory}/{attribute.Page}.svelte';");
                routesBuilder.AppendLine(
                    $"    '{attribute.Template}': {componentName},");
            }
        }

        var routerPath = Path.Combine(_environment.ContentRootPath, _options.RouterPath);

        var importString = importBuilder.ToString();
        var routesString = routesBuilder.ToString();

        resultBuilder.AppendLine("// <auto-generated />");
        resultBuilder.AppendLine(importString);
        resultBuilder.AppendLine("export const routes = {");
        resultBuilder.AppendLine(routesString[..^3]);
        resultBuilder.AppendLine("}");

        var resultString = resultBuilder.ToString()[..^2];
        await File.WriteAllTextAsync(routerPath, resultString);
    }
}