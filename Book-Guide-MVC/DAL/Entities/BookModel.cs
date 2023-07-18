namespace Book_Guide_MVC.DAL.Entities
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string TableContents { get; set; }
        public string Dedication { get; set; }
        public string Preface { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public IList<BookChaptersModel> Chapters { get; set; }


    }


}
