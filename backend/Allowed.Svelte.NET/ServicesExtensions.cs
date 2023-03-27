using Allowed.Svelte.NET.Options;
using Allowed.Svelte.NET.ServerSide;
using Allowed.Svelte.NET.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Allowed.Svelte.NET;

public static class ServicesExtensions
{
    public static IServiceCollection AddSvelte(this IServiceCollection services,
        Action<SvelteOptions>? options = null)
    {
        options ??= _ => { };

        services.Configure(options);
        services.AddSingleton<ServerSideDataCollection>();
        services.AddTransient<SvelteService>();

        return services;
    }

    public static IServiceCollection AddServerSideData(this IServiceCollection services,
        params IServerSideData[] dataItems)
    {
        services.AddSingleton(new ServerSideDataCollection
        {
            DataItems = dataItems.ToList()
        });
        
        return services;
    }

    public static async Task<WebApplication> RunWatchClient(this WebApplication app)
    {
        await app.Services.GetRequiredService<SvelteService>().RunWatchClient();
        return app;
    }

    public static async Task<WebApplication> RunWatchServer(this WebApplication app)
    {
        await app.Services.GetRequiredService<SvelteService>().RunWatchServer();
        return app;
    }

    public static async Task<WebApplication> RunWatchAll(this WebApplication app)
    {
        await app.Services.GetRequiredService<SvelteService>().RunWatchAll();
        return app;
    }
}