namespace Svelte.NET.Options;

public class SvelteRouterOptions
{
    public string RouterPath { get; set; } = Path.Combine("ClientApp", "src", "routers", "Router.ts");
    public string PagesDirectory { get; set; } = "pages";
}