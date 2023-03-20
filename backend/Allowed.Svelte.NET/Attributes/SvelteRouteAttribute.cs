using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Attributes;

[AttributeUsage(AttributeTargets.Method, Inherited = false)]
public class SvelteRouteAttribute : HttpGetAttribute
{
    public string Template { get; set; }
    public string Page { get; set; }
    public string? Layout { get; set; }
    
    public SvelteRouteAttribute(string template, string page)
        : base(template)
    {
        Template = template;
        Page = page;
    }
}