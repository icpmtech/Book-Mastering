using Book_Guide_MVC.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Book_Guide_MVC.Services;

namespace Book_Guide_MVC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            
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

            app.UseAuthorization();

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