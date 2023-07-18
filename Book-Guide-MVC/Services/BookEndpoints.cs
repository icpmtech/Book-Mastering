using Microsoft.EntityFrameworkCore;
using Book_Guide_MVC.DAL;
using Book_Guide_MVC.DAL.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
namespace Book_Guide_MVC.Services;

public static class BookEndpoints
{
    public static void MapBookModelEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/BookModel").WithTags(nameof(BookModel));

        group.MapGet("/", async (BookDbContext db) =>
        {
            return await db.Books.Include(b => b.Chapters).ToListAsync();
        })
        .WithName("GetAllBookModels")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<BookModel>, NotFound>> (int id, BookDbContext db) =>
        {
            return await db.Books.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is BookModel model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetBookModelById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, BookModel bookModel, BookDbContext db) =>
        {
            var affected = await db.Books
                .Where(model => model.Id == id).Include(b => b.Title).Include(b => b.Chapters)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, bookModel.Id)
                  .SetProperty(m => m.Url, bookModel.Url)
                  .SetProperty(m => m.TableContents, bookModel.TableContents)
                  .SetProperty(m => m.Dedication, bookModel.Dedication)
                  .SetProperty(m => m.Preface, bookModel.Preface)
                );

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateBookModel")
        .WithOpenApi();

        group.MapPost("/", async (BookModel bookModel, BookDbContext db) =>
        {
            db.Books.Add(bookModel);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/BookModel/{bookModel.Id}",bookModel);
        })
        .WithName("CreateBookModel")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, BookDbContext db) =>
        {
            var affected = await db.Books
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteBookModel")
        .WithOpenApi();
    }
}
