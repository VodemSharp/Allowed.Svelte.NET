using System.Net;
using System.Text.Json;
using Jering.Javascript.NodeJS;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Svelte.NET.Models;

namespace Svelte.NET.ActionResults;

public class SvelteView : IActionResult
{
    protected static async Task<string> GetResponseText(ActionContext context, string ssrData = "{}")
    {
        var environment = context.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
        var nodeJsService = context.HttpContext.RequestServices.GetRequiredService<INodeJSService>();

        var serverRender =
            (await File.ReadAllTextAsync(Path.Combine(environment.ContentRootPath, "Scripts", "prerender.js")))
            .Split("export")[0];

        var request = context.HttpContext.Request;
        var url =
            $"{request.Scheme}://{request.Host.ToUriComponent()}{request.PathBase.ToUriComponent()}{request.Path.ToUriComponent()}{request.QueryString.ToUriComponent()}";

        var javascriptModule =
            $@"module.exports = async () => {{ {serverRender} return await render('{url}', {ssrData}); }}";

        var renderedData = await nodeJsService.InvokeFromStringAsync<RenderedData>(javascriptModule);

        if (renderedData == null)
            return "Error"; // TODO

        return (await File.ReadAllTextAsync(Path.Combine(environment.WebRootPath, "app/index.html")))
            .Replace("%svelte.body%", renderedData.HTML)
            .Replace("%svelte.head%", renderedData.Head)
            .Replace("%svelte.css%", $"<style>{renderedData.CSS.Code}</style>");
    }

    private static async Task<string> GetNotTypedResponseText(ActionContext context)
    {
        var result = await GetResponseText(context);
        return result.Replace("%svelte.state%", string.Empty);
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
        await context.HttpContext.Response.WriteAsync(await GetNotTypedResponseText(context));
    }
}

public class SvelteView<T> : SvelteView
    where T : class
{
    private readonly T _ssrData;

    private readonly JsonSerializerOptions _options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DictionaryKeyPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
    };

    public SvelteView(T ssrData)
    {
        _ssrData = ssrData;
    }

    private string GetSerializedData(T data)
    {
        return JsonSerializer.Serialize<object>(data, _options);
    }

    private async Task<string> GetTypedResponseText(ActionContext context)
    {
        var ssrData = GetSerializedData(_ssrData);
        var result = await GetResponseText(context, ssrData);

        result = result.Replace("%svelte.state%", $"<script>window.SVELTE_DOT_NET_STATE = {ssrData}</script>");

        return result;
    }

    public override async Task ExecuteResultAsync(ActionContext context)
    {
        if (context.HttpContext.Request.Headers["svdn-data-only"] == "1")
        {
            await ProcessApiResponseData(context);
            await context.HttpContext.Response.WriteAsync(GetSerializedData(_ssrData));
            return;
        }

        await ProcessResponseData(context);
        await context.HttpContext.Response.WriteAsync(await GetTypedResponseText(context));
    }
}