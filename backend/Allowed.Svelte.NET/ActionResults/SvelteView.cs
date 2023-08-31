using System.Text.Json;
using Allowed.Svelte.NET.Exceptions;
using Allowed.Svelte.NET.Models;
using Allowed.Svelte.NET.ServerSide;
using Jering.Javascript.NodeJS;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Allowed.Svelte.NET.ActionResults;

public class SvelteView : IActionResult
{
    protected readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DictionaryKeyPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
    };

    protected virtual async Task<Dictionary<string, object>> GetServerSideData(ActionContext context)
    {
        var provider = context.HttpContext.RequestServices;
        var collection = provider.GetService<ServerSideDataCollection>();
        var ssrDictionary = new Dictionary<string, object>();

        if (collection == null) return ssrDictionary;

        foreach (var item in collection.DataItems)
        {
            var data = await item.Get(context.HttpContext);

            if (data != null)
                ssrDictionary[item.Section] = data;
        }

        return ssrDictionary;
    }

    private async Task<string> GetSerializedData(ActionContext context)
    {
        return JsonSerializer.Serialize(await GetServerSideData(context), Options);
    }

    private static async Task<string> GetResponseText(ActionContext context, string ssrData = "{}")
    {
        var environment = context.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
        var nodeJsService = context.HttpContext.RequestServices.GetRequiredService<INodeJSService>();

        var prerenderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "scripts", "prerender.js");

        if (!File.Exists(prerenderPath))
            throw new BuildingException();

        var temp = (await File.ReadAllTextAsync(prerenderPath)).Split("export");
        var serverRender = string.Join("export", temp.Take(temp.Length - 1));

        var request = context.HttpContext.Request;
        var url =
            $"{request.Scheme}://{request.Host.ToUriComponent()}{request.PathBase.ToUriComponent()}{request.Path.ToUriComponent()}{request.QueryString.ToUriComponent()}";

        var javascriptModule =
            $@"module.exports = async () => {{ {serverRender} return await render('{url}', {ssrData}); }}";

        var renderedData = await nodeJsService.InvokeFromStringAsync<RenderedData>(javascriptModule);

        if (renderedData == null)
            throw new RenderingException();

        var appPath = Path.Combine(environment.WebRootPath, "app/index.html");
        
        if (!File.Exists(appPath))
            throw new BuildingException();
        
        return (await File.ReadAllTextAsync(appPath))
            .Replace("%svelte.body%", renderedData.HTML)
            .Replace("%svelte.head%", renderedData.Head)
            .Replace("%svelte.css%", $"<style>{renderedData.CSS.Code}</style>");
    }

    protected async Task<string> GetStateResponseText(ActionContext context)
    {
        var serializedData = await GetSerializedData(context);
        var result = await GetResponseText(context, serializedData);

        return result.Replace("%svelte.state%",
            $"<script>window.SVELTE_DOT_NET_STATE = {serializedData}</script>");
    }

    protected static Task ProcessResponseData(ActionContext context)
    {
        context.HttpContext.Response.ContentType = "text/html";
        return Task.CompletedTask;
    }

    protected static Task ProcessApiResponseData(ActionContext context)
    {
        context.HttpContext.Response.ContentType = "application/json";
        return Task.CompletedTask;
    }

    public virtual async Task ExecuteResultAsync(ActionContext context)
    {
        if (context.HttpContext.Request.Headers["svdn-data-only"] == "1")
        {
            await ProcessApiResponseData(context);
            await context.HttpContext.Response.WriteAsync("{}");
            return;
        }

        await ProcessResponseData(context);

        try
        {
            await context.HttpContext.Response.WriteAsync(await GetStateResponseText(context));
        }
        catch (BuildingException)
        {
            await context.HttpContext.Response.WriteAsync("Build is not yet complete!");
        }
        catch (RenderingException)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        }
    }
}

public class SvelteView<T> : SvelteView
    where T : class
{
    private readonly T _ssrData;

    public SvelteView(T ssrData)
    {
        _ssrData = ssrData;
    }

    protected override async Task<Dictionary<string, object>> GetServerSideData(ActionContext context)
    {
        var result = await base.GetServerSideData(context);
        result["Model"] = _ssrData;
        return result;
    }

    public override async Task ExecuteResultAsync(ActionContext context)
    {
        if (context.HttpContext.Request.Headers["svdn-data-only"] == "1")
        {
            await ProcessApiResponseData(context);
            await context.HttpContext.Response.WriteAsync(JsonSerializer.Serialize(_ssrData, Options));
            return;
        }

        await ProcessResponseData(context);
        await context.HttpContext.Response.WriteAsync(await GetStateResponseText(context));
    }
}