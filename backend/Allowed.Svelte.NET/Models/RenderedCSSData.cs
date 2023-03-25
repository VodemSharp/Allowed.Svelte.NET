using System.Text.Json.Serialization;

namespace Allowed.Svelte.NET.Models;

public class RenderedCSSData
{
    [JsonPropertyName("code")]
    public string Code { get; set; } = null!;

    [JsonPropertyName("map")]
    public string Map { get; set; } = null!;
}