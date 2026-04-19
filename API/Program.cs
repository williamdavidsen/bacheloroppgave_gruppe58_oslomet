using Microsoft.EntityFrameworkCore;
using SecurityAssessmentAPI.DAL;
using SecurityAssessmentAPI.DAL.Interfaces;
using SecurityAssessmentAPI.DAL.Repositories;
using SecurityAssessmentAPI.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("SecurityAssessmentDb"));

builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped<IAssessmentRunRepository, AssessmentRunRepository>();
builder.Services.AddScoped<ICheckTypeRepository, CheckTypeRepository>();
builder.Services.AddScoped<ICheckResultRepository, CheckResultRepository>();
builder.Services.AddScoped<IFindingRepository, FindingRepository>();

builder.Services.AddScoped<ISslCheckingService, SslCheckingService>();
builder.Services.AddScoped<IEmailCheckingService, EmailCheckingService>();

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
