using Microsoft.AspNetCore.Mvc;

namespace Svelte.NET.Attributes;

[AttributeUsage(AttributeTargets.Method, Inherited = false)]
public class SvelteRouteAttribute : HttpGetAttribute
{
    public string Template { get; set; }
    public string Page { get; set; }
    public string ComponentName { get; set; }
    
    public SvelteRouteAttribute(string template, string page, string componentName = null)
        : base(template)
    {
        Template = template;
        Page = page;
        ComponentName = componentName;
    }
}