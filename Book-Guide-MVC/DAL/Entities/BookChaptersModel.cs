namespace Book_Guide_MVC.DAL.Entities
{
    public class BookChaptersModel
    {
        public BookTitleModel titleModel { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        IList<BookSectionsModel>? sections { get; set; }

        
    }


}
