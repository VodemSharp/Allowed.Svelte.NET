using Microsoft.AspNetCore.Http;

namespace Allowed.Svelte.NET.ServerSide;

public interface IServerSideData
{
    string Section { get; }
    Task<object?> Get(HttpContext httpContext);
}