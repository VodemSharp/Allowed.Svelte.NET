using Jering.Javascript.NodeJS;
using Allowed.Svelte.NET;
using Allowed.Svelte.NET.ActionResults;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddNodeJS();
builder.Services.AddSvelte()
    .AddSvelteRouter();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

await app.BuildRouter();
await app.RunWatchAll();
app.Run();