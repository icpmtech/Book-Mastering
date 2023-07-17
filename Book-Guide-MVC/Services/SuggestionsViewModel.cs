namespace Book_Guide_MVC.Services
{
    public class SuggestionsViewModel
    {
        public SuggestionsViewModel(string text)
        {
            Text = text;
        }

        public string Text { get; }
    }
}