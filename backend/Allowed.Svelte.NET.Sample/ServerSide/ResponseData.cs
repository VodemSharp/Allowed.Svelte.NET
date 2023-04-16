using Allowed.Svelte.NET.ServerSide;

namespace Allowed.Svelte.NET.Sample.ServerSide;

public class ResponseData : IServerSideData
{
    public string Section => "Response";

    public Task<object?> Get(HttpContext httpContext)
    {
        return Task.FromResult<object?>(new { httpContext.Response.StatusCode });
    }
}