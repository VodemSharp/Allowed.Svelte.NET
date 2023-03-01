using System.Text.Json.Serialization;

namespace Svelte.NET.Models;

public class RenderedData
{
    [JsonPropertyName("html")]
    public string HTML { get; set; }
    
    [JsonPropertyName("css")]
    public RenderedCSSData CSS { get; set; }
    
    [JsonPropertyName("head")]
    public string Head { get; set; }
}