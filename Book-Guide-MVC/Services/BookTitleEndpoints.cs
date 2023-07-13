using Microsoft.EntityFrameworkCore;
using Book_Guide_MVC.DAL;
using Book_Guide_MVC.DAL.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
namespace Book_Guide_MVC.Services;

public static class BookTitleEndpoints
{
    public static void MapBookTitleModelEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/BookTitleModel").WithTags(nameof(BookTitleModel));

        group.MapGet("/", async (BookDbContext db) =>
        {
            return await db.BookTitles.ToListAsync();
        })
        .WithName("GetAllBookTitleModels")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<BookTitleModel>, NotFound>> (int id, BookDbContext db) =>
        {
            return await db.BookTitles.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is BookTitleModel model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetBookTitleModelById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, BookTitleModel bookTitleModel, BookDbContext db) =>
        {
            var affected = await db.BookTitles
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, bookTitleModel.Id)
                  .SetProperty(m => m.Title, bookTitleModel.Title)
                );

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateBookTitleModel")
        .WithOpenApi();

        group.MapPost("/", async (BookTitleModel bookTitleModel, BookDbContext db) =>
        {
            db.BookTitles.Add(bookTitleModel);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/BookTitleModel/{bookTitleModel.Id}",bookTitleModel);
        })
        .WithName("CreateBookTitleModel")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, BookDbContext db) =>
        {
            var affected = await db.BookTitles
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteBookTitleModel")
        .WithOpenApi();
    }
}
