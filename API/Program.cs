using SecurityAssessmentAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ISslCheckingService, SslCheckingService>();

builder.Services.AddHttpClient<ISslLabsClient, SslLabsClient>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddHttpClient<IHardenizeClient, HardenizeClient>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(20);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
