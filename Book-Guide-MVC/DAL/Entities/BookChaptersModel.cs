namespace Book_Guide_MVC.DAL.Entities
{
    public class BookChaptersModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public IList<BookSectionsModel>? Sections { get; set; }

        
    }


}
