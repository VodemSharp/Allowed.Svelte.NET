using Microsoft.AspNetCore.Mvc;

namespace Allowed.Svelte.NET.Attributes;

[AttributeUsage(AttributeTargets.Method, Inherited = false)]
public class SvelteRouteAttribute : HttpGetAttribute
{
    public string Page { get; set; }
    public string? Layout { get; set; }
    
    public SvelteRouteAttribute(string template = "")
        : base(template)
    {
        
    }
}