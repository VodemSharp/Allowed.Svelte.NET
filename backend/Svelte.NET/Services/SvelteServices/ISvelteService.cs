namespace Svelte.NET.Services.SvelteServices;

public interface ISvelteService
{ 
    Task RunWatchClient();
    Task RunWatchServer();
    Task RunWatchAll();
}