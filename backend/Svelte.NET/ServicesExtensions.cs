using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Svelte.NET.Options;
using Svelte.NET.Services.SvelteRouterServices;
using Svelte.NET.Services.SvelteServices;

namespace Svelte.NET;

public static class ServicesExtensions
{
    public static IServiceCollection AddSvelte(this IServiceCollection services,
        Action<SvelteOptions>? options = null)
    {
        options ??= _ => { };

        services.Configure(options);
        services.AddTransient<ISvelteService, SvelteService>();

        return services;
    }

    public static IServiceCollection AddSvelteRouter(this IServiceCollection services,
        Action<SvelteRouterOptions>? options = null)
    {
        options ??= _ => { };

        services.Configure(options);
        services.AddTransient<ISvelteRouterService, SvelteRouterService>();

        return services;
    }

    public static async Task<WebApplication> BuildRouter(this WebApplication app)
    {
        await app.Services.GetRequiredService<ISvelteRouterService>().BuildRouter();
        return app;
    }
    
    public static async Task<WebApplication> RunWatchClient(this WebApplication app)
    {
        await app.Services.GetRequiredService<ISvelteService>().RunWatchClient();
        return app;
    }

    public static async Task<WebApplication> RunWatchServer(this WebApplication app)
    {
        await app.Services.GetRequiredService<ISvelteService>().RunWatchServer();
        return app;
    }

    public static async Task<WebApplication> RunWatchAll(this WebApplication app)
    {
        await app.Services.GetRequiredService<ISvelteService>().RunWatchAll();
        return app;
    }
}