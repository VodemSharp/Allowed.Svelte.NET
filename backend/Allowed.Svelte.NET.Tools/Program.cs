using Allowed.Svelte.NET.Tools.Options;
using Allowed.Svelte.NET.Tools.Routers;
using CommandLine;

if (args.Length == 0)
    return;

var action = args[0].ToLower();

if (action == "build")
{
    var parsedArgs = Parser.Default.ParseArguments<RouterOptions>(args);
    if (parsedArgs.Tag == ParserResultType.Parsed)
    {
        await RouterService.Build(parsedArgs.Value);
        Console.WriteLine("The router has been created!");
    }
    else
        throw new Exception("Args parsing error!");
}
else
{
    throw new Exception("Unknown command!");
}