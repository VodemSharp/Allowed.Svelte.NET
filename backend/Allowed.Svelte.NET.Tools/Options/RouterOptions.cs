using CommandLine;

namespace Allowed.Svelte.NET.Tools.Options;

public class RouterOptions
{
    [Option('a', "assemblies", Required = true, HelpText = "Project assemblies.")]
    public IEnumerable<string> Assemblies { get; set; } = null!;

    [Option('c', "content", Required = false, HelpText = "Content root path.")]
    public string ContentRootPath { get; set; } = ".";

    [Option('r', "routes", Required = false, HelpText = "Path to routes file.")]
    public string RoutesPath { get; set; } = Path.Combine("ClientApp", "src", "routes.ts");
    
    [Option('p', "pages", Required = false, HelpText = "Path to pages folder.")]
    public string PagesDirectory { get; set; } = "pages";
    
    [Option('l', "layouts", Required = false, HelpText = "Path to layouts folder.")]
    public string LayoutsDirectory { get; set; } = "layouts";
}