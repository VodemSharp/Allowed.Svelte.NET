namespace Allowed.Svelte.NET.Tools.Models;

public class RouteData
{
    public string Template { get; set; } = null!;
    public string Page { get; set; } = null!;
    public string? Layout { get; set; }
}