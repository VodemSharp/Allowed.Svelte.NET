using System.Text.Json.Serialization;

namespace Svelte.NET.Models;

public class RenderedCSSData
{
    [JsonPropertyName("code")]
    public string Code { get; set; }
    
    [JsonPropertyName("map")]
    public string Map { get; set; }
}