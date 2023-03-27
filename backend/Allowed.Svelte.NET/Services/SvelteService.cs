using System.Diagnostics;
using Allowed.Svelte.NET.Options;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;

namespace Allowed.Svelte.NET.Services;

public class SvelteService
{
    private readonly Process _watchClientProcess;
    private readonly Process _watchServerProcess;

    public SvelteService(IWebHostEnvironment environment, IOptions<SvelteOptions> options)
    {
        var workingDirectory = Path.Combine(environment.ContentRootPath, options.Value.WorkingDirectory);
        var vitePath = Path.Combine("node_modules", ".bin", "vite");

        var appDirectory = Path.Combine(environment.WebRootPath, "app");

        _watchClientProcess = new Process();
        _watchClientProcess.StartInfo.WorkingDirectory = workingDirectory;
        _watchClientProcess.StartInfo.FileName = "cmd";
        _watchClientProcess.StartInfo.Arguments =
            $"/C {vitePath} --watch build --outDir \"{appDirectory}\" --emptyOutDir";

        var scriptsDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "scripts");
        var prerenderPath = Path.Combine(workingDirectory, "src", "prerender.ts");

        _watchServerProcess = new Process();
        _watchServerProcess.StartInfo.WorkingDirectory = workingDirectory;
        _watchServerProcess.StartInfo.FileName = "cmd";
        _watchServerProcess.StartInfo.Arguments =
            $"/C {vitePath} --watch build --outDir \"{scriptsDirectory}\" --ssr \"{prerenderPath}\" --emptyOutDir";
    }

    public Task RunWatchClient()
    {
        _watchClientProcess.Start();
        return Task.CompletedTask;
    }

    public Task RunWatchServer()
    {
        _watchServerProcess.Start();
        return Task.CompletedTask;
    }

    public async Task RunWatchAll()
    {
        await RunWatchClient();
        await RunWatchServer();
    }
}