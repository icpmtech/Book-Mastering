using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Book_Guide_MVC.Services
{

  
    [Route("api/[controller]")]
    [ApiController]
    public class ChapGPTServiceController : ControllerBase
    {
        private ILogger<ChapGPTServiceController> _logger;
        public ChapGPTServiceController(ILogger<ChapGPTServiceController> logger)
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
        public async Task<string> GetChaptersSectionsAsync(string question)
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
        public async Task<string> GetChaptersAsync(string question)
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
        public async Task<string> GetTitlesAsync(string question)
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

        private async Task<string> CallChatGPTExternalAPI(string question)
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
                throw new Exception(errorResponse.Error.Message);
            }
            //var data = JsonSerializer.Deserialize<OpenAIResponse>(resjson);
            var data = JsonSerializer.Deserialize<Root>(resjson);
            //var data = JsonSerializer.Deserialize(resjson, typeof(object));
            StringBuilder sb=new StringBuilder();
            foreach (var item in data.choices)
            {
                sb.AppendLine(item.text);
            }
          string results=  sb.ToString(); ;
           return results;
        }

      }



}
