using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Svelte.NET.Options;

namespace Svelte.NET.Services.SvelteServices;

public class SvelteService : ISvelteService
{
    private readonly Process _watchClientProcess;
    private readonly Process _watchServerProcess;

    public SvelteService(IWebHostEnvironment environment, IOptions<SvelteOptions> options)
    {
        var workingDirectory = Path.Combine(environment.ContentRootPath, options.Value.WorkingDirectory);

        _watchClientProcess = new Process();
        _watchClientProcess.StartInfo.WorkingDirectory = workingDirectory;
        _watchClientProcess.StartInfo.FileName = "cmd";
        _watchClientProcess.StartInfo.Arguments = "/C npm run dev:client";

        _watchServerProcess = new Process();
        _watchServerProcess.StartInfo.WorkingDirectory = workingDirectory;
        _watchServerProcess.StartInfo.FileName = "cmd";
        _watchServerProcess.StartInfo.Arguments = "/C npm run dev:server";
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