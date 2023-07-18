using Book_Guide_MVC.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Book_Guide_MVC.Services;
using Microsoft.CodeAnalysis.Options;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.CodeAnalysis;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Book_Guide_MVC
{
    public class Program
    {

       
        public static void Main(string[] args)
        {
             string CORSOpenPolicy = "OpenCORSPolicy";
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options => {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "https://localhost:4200",
                ValidAudience = "https://localhost:4200",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
            };
            builder.Configuration.Bind("JwtSettings", options);
            }
        )
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
        options => {
            options.AccessDeniedPath = "api/denied";
            options.LoginPath = "api/Login/login";
            builder.Configuration.Bind("CookieSettings", options);
        });



            // Add EF services to the services container.
            builder.Services.AddDbContext<BookDbContext>(
        options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
            builder.Services.AddControllersWithViews();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "API",
                        Description = "API  .NET 7 + Minimum APIs",
                        Version = "v1",
                        Contact = new OpenApiContact()
                        {
                            Name = "Cantinho de .net",
                            Url = new Uri("https://cantinhode.net"),
                        },
                        License = new OpenApiLicense()
                        {
                            Name = "MIT",
                            Url = new Uri("http://opensource.org/licenses/MIT"),
                        }
                    });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });


            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                  name: CORSOpenPolicy,
                  builder => {
                      builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
                  });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Book Helper v1");
            });

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            };
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors(CORSOpenPolicy);
            app.UseAuthorization();
            app.UseAuthentication();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.MapBookChaptersModelEndpoints();

            app.MapBookSectionsModelEndpoints();

            app.MapBookModelEndpoints();

            app.MapBookTitleModelEndpoints();

            app.Run();
        }
    }
}