namespace Book_Guide_MVC.DAL.Entities
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string TableContents { get; set; }
        public string Dedication { get; set; }
        public string Preface { get; set; }
        public BookTitleModel Title { get; set; }
        public IList<BookChaptersModel> Chapters { get; set; }


    }

    public class BookTitleModel
    {
        public int Id { get; set; }
        public string Title { get; set; }


    }

    public class BookChaptersModel
    {
        public BookTitleModel titleModel { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        IList<BookSectionsModel>? sections { get; set; }

        
    }
    public class BookSectionsModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }


}
