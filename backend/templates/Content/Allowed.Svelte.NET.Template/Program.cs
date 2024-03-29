using Allowed.Svelte.NET;
using Allowed.Svelte.NET.Template.Data;
using Jering.Javascript.NodeJS;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddNodeJS();
builder.Services.AddSvelte();

builder.Services.AddSingleton<WeatherForecastService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapControllers();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

if (app.Environment.IsDevelopment())
    await app.RunWatchAll();

app.Run();