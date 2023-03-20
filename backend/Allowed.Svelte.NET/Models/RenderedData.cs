using System.Text.Json.Serialization;

namespace Allowed.Svelte.NET.Models;

public class RenderedData
{
    [JsonPropertyName("html")]
    public string HTML { get; set; }
    
    [JsonPropertyName("css")]
    public RenderedCSSData CSS { get; set; }
    
    [JsonPropertyName("head")]
    public string Head { get; set; }
}