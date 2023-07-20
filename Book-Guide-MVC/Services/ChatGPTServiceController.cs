using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Book_Guide_MVC.Services
{


    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatGPTServiceController : ControllerBase
    {
        private ILogger<ChatGPTServiceController> _logger;
        public ChatGPTServiceController(ILogger<ChatGPTServiceController> logger)
        {
            _logger = logger;
        }

        // GET: api/<ChapGPTServiceController>
        /// <summary>
        /// Get Chapters to Books
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetChaptersSections")]
        public async Task<IEnumerable<SuggestionsViewModel>> GetChaptersSectionsAsync(string question)
        {
            try
            {
                return await CallChatGPTExternalAPI(question);
            }


            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while making the OpenAI API request");

            }
            return null;
        }
        // GET: api/<ChapGPTServiceController>
        /// <summary>
        /// Get Chapters to Books
        /// </summary>
        /// <returns></returns>
        [HttpGet]
      
        [Route("GetChapters")]
        public async Task<IEnumerable<SuggestionsViewModel>> GetChaptersAsync(string question)
        {
            try
            {
                return await CallChatGPTExternalAPI(question);
            }


            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while making the OpenAI API request");

            }
            return null;
        }

        // GET: api/<ChapGPTServiceController>
        /// <summary>
        /// Get Titles to Books
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTitles")]
        public async Task<IEnumerable<SuggestionsViewModel>> GetTitlesAsync(string question)
        {
            try
            {
              return  await CallChatGPTExternalAPI(question);
            }


            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while making the OpenAI API request");
               
            }
            return null;
        }

        private async Task<IEnumerable<SuggestionsViewModel>?> CallChatGPTExternalAPI(string question)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "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");

            var request = new OpenAIRequest
            {
                Model = "text-davinci-002",
                Prompt = question, 
                Temperature = 0.7f,
                MaxTokens = 50
            };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("https://api.openai.com/v1/completions", content);
            var resjson = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                var errorResponse = JsonSerializer.Deserialize<OpenAIErrorResponse>(resjson);
                throw new Exception(errorResponse?.Error.Message);
            }
            var data = JsonSerializer.Deserialize<Root>(resjson);
            return data?.choices.Select(s=>new SuggestionsViewModel(text: s.text));
        }

      }



}
