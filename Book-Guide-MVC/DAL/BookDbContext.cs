namespace Book_Guide_MVC.DAL
{
    using Book_Guide_MVC.DAL.Entities;
    using Microsoft.EntityFrameworkCore;
    public class BookDbContext : DbContext
    {
        public DbSet<BookModel> Books { get; set; }
        public DbSet<BookTitleModel> BookTitles { get; set; }
        public DbSet<BookChaptersModel> BookChapters { get; set; }
        public DbSet<BookSectionsModel> BookSections { get; set; }

      
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
    }

}
