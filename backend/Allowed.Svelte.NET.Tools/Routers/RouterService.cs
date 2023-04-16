﻿using System.Reflection;
using System.Text;
using Allowed.Svelte.NET.Attributes;
using Allowed.Svelte.NET.Tools.Options;
using Microsoft.AspNetCore.Mvc;
using RouteData = Allowed.Svelte.NET.Tools.Models.RouteData;

namespace Allowed.Svelte.NET.Tools.Routers;

public static class RouterService
{
    private static string GetComponentName(string path)
    {
        return path.Split("/").Last().Replace(".svelte", "");
    }

    public static string NormalizeControllerTemplate(string template)
    {
        if (template == "") return template;

        template = template.First() == '/' ? template : $"/{template}";
        template = template.Length != 1 && template.Last() == '/' ? template[..^1] : template;
        template = template == "/" ? "" : template;

        return template;
    }

    public static string NormalizeRouteTemplate(string? template)
    {
        template ??= "";
        if (template == "") return template;

        return template.Last() == '/' && template.Length != 1 ? template[..^1] : template;
    }

    public static string JoinTemplates(string controllerTemplate, string routeTemplate)
    {
        if (routeTemplate == "") return controllerTemplate;
        return routeTemplate.First() == '/' ? routeTemplate : $"{controllerTemplate}/{routeTemplate}";
    }

    public static async Task Build(RouterOptions options)
    {
        var importBuilder = new StringBuilder();
        var routesBuilder = new StringBuilder();
        var resultBuilder = new StringBuilder();

        var methods = options.Assemblies.Select(Assembly.LoadFrom)
            .SelectMany(x => x.GetTypes())
            .Where(x => x.IsClass)
            .SelectMany(t => t.GetMethods())
            .Where(m => m.GetCustomAttributes(typeof(SvelteRouteAttribute), false).Length > 0)
            .ToArray();

        var routes = new List<RouteData>();

        foreach (var method in methods)
        {
            var attributes = method.GetCustomAttributes(typeof(SvelteRouteAttribute), false)
                .Cast<SvelteRouteAttribute>().ToArray();

            var controllerTemplates = method.DeclaringType!.GetCustomAttributes(typeof(RouteAttribute), false)
                .Cast<RouteAttribute>().Select(r => NormalizeControllerTemplate(r.Template)).ToArray();

            controllerTemplates = controllerTemplates.Length == 0 ? new[] { "" } : controllerTemplates;

            foreach (var controllerTemplate in controllerTemplates)
            {
                foreach (var attribute in attributes)
                {
                    var page = attribute.Page;
                    var template = NormalizeRouteTemplate(attribute.Template);
                    var layout = attribute.Layout;

                    routes.Add(new RouteData
                    {
                        Template = JoinTemplates(controllerTemplate, template),
                        Page = page.StartsWith("/") ? page : $"./{options.PagesDirectory}/{page}.svelte",
                        Layout = string.IsNullOrEmpty(layout) || layout.StartsWith("/")
                            ? layout
                            : $"./{options.LayoutsDirectory}/{layout}.svelte"
                    });
                }
            }
        }

        var importPath = routes.SelectMany(r => new[]
            {
                r.Page,
                r.Layout
            }).Where(r => !string.IsNullOrEmpty(r))
            .Cast<string>().Distinct().OrderBy(p => p).ToList();

        var imports = new Dictionary<string, string>();

        var lastPage = "";
        var counter = 2;

        foreach (var path in importPath)
        {
            var pageName = GetComponentName(path);
            if (pageName == lastPage)
            {
                imports.Add(path, $"{pageName}{counter}");
                counter++;
            }
            else
            {
                imports.Add(path, pageName);
                lastPage = pageName;
                counter = 2;
            }
        }

        foreach (var (path, name) in imports)
            importBuilder.AppendLine($"import {name} from '{path}';");

        importBuilder.AppendLine("import {RouteData} from 'svelte-dotnet';");

        foreach (var route in routes)
        {
            var layoutPart = string.IsNullOrEmpty(route.Layout) ? "" : $", {imports[route.Layout]}";
            routesBuilder.AppendLine($"    '{route.Template}': new RouteData({imports[route.Page]}{layoutPart}),");
        }

        var routerPath = Path.Combine(options.ContentRootPath, options.RoutesPath);

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