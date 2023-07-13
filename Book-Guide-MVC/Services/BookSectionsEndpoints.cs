using Microsoft.EntityFrameworkCore;
using Book_Guide_MVC.DAL;
using Book_Guide_MVC.DAL.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
namespace Book_Guide_MVC.Services;

public static class BookSectionsEndpoints
{
    public static void MapBookSectionsModelEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/BookSectionsModel").WithTags(nameof(BookSectionsModel));

        group.MapGet("/", async (BookDbContext db) =>
        {
            return await db.BookSections.ToListAsync();
        })
        .WithName("GetAllBookSectionsModels")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<BookSectionsModel>, NotFound>> (int id, BookDbContext db) =>
        {
            return await db.BookSections.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is BookSectionsModel model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetBookSectionsModelById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, BookSectionsModel bookSectionsModel, BookDbContext db) =>
        {
            var affected = await db.BookSections
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, bookSectionsModel.Id)
                  .SetProperty(m => m.Title, bookSectionsModel.Title)
                  .SetProperty(m => m.Body, bookSectionsModel.Body)
                );

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateBookSectionsModel")
        .WithOpenApi();

        group.MapPost("/", async (BookSectionsModel bookSectionsModel, BookDbContext db) =>
        {
            db.BookSections.Add(bookSectionsModel);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/BookSectionsModel/{bookSectionsModel.Id}",bookSectionsModel);
        })
        .WithName("CreateBookSectionsModel")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, BookDbContext db) =>
        {
            var affected = await db.BookSections
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteBookSectionsModel")
        .WithOpenApi();
    }
}
