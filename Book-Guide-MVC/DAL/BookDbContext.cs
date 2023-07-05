namespace Book_Guide_MVC.DAL
{
    using Book_Guide_MVC.DAL.Entities;
    using Microsoft.EntityFrameworkCore;
    public class BookDbContext : DbContext
    {
        public DbSet<BookModel> Books { get; set; }
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
    }

}
