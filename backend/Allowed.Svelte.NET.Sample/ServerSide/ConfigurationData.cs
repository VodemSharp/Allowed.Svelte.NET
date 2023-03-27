using Allowed.Svelte.NET.ServerSide;

namespace Allowed.Svelte.NET.Sample.ServerSide;

public class ConfigurationData<T> : IServerSideData
    where T : class
{
    public string Section => "Configuration";
    private readonly string _sectionName;

    public ConfigurationData(string sectionName = "ClientData")
    {
        _sectionName = sectionName;
    }

    public Task<object?> Get(HttpContext httpContext)
    {
        return Task.FromResult<object?>(
            httpContext.RequestServices.GetRequiredService<IConfiguration>().GetSection(_sectionName).Get<T>());
    }
}