using Microsoft.EntityFrameworkCore;
using Book_Guide_MVC.DAL;
using Book_Guide_MVC.DAL.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Authorization;

namespace Book_Guide_MVC.Services;

public static class BookChaptersEndpoints
{
   
    public static void MapBookChaptersModelEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/BookChaptersModel").WithTags(nameof(BookChaptersModel));

        group.MapGet("/", async (BookDbContext db) =>
        {
            return await db.BookChapters.ToListAsync();
        })
        .RequireAuthorization( )
        .WithName("GetAllBookChaptersModels")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<BookChaptersModel>, NotFound>> (int id, BookDbContext db) =>
        {
            return await db.BookChapters.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is BookChaptersModel model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetBookChaptersModelById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, BookChaptersModel bookChaptersModel, BookDbContext db) =>
        {
            var affected = await db.BookChapters
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, bookChaptersModel.Id)
                  .SetProperty(m => m.Title, bookChaptersModel.Title)
                  .SetProperty(m => m.Body, bookChaptersModel.Body)
                );

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateBookChaptersModel")
        .WithOpenApi();

        group.MapPost("/", async (BookChaptersModel bookChaptersModel, BookDbContext db) =>
        {
            db.BookChapters.Add(bookChaptersModel);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/BookChaptersModel/{bookChaptersModel.Id}",bookChaptersModel);
        })
        .WithName("CreateBookChaptersModel")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, BookDbContext db) =>
        {
            var affected = await db.BookChapters
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteBookChaptersModel")
        .WithOpenApi();
    }
}
