namespace Allowed.Svelte.NET.Options;

public class SvelteRouterOptions
{
    public string RouterPath { get; set; } = Path.Combine("ClientApp", "src", "routers.ts");
    public string PagesDirectory { get; set; } = "pages";
    public string LayoutsDirectory { get; set; } = "layouts";
}