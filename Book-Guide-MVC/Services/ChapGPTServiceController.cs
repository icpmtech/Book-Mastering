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
        [HttpGet]
        public async Task<string> GetAsync()
        {
            try
            {
              return  await CallChatGPTExternalAPI();
            }


            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while making the OpenAI API request");
               
            }
            return null;
        }

        private async Task<string> CallChatGPTExternalAPI()
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "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");

            var request = new OpenAIRequest
            {
                Model = "text-davinci-002",
                Prompt = generatePrompt($"Name my DOG"), //$"Name my {AnimalInput}",
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
           return data.choices[0].text;
        }

        private string generatePrompt(string animal)
        {
            var capitalizedAnimal = animal.Trim();
            return "Suggest three names for an animal that is a superhero." +
                    "Animal: Cat" +
                    "Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline" +
                    "Animal: Dog" +
                    "Names: Ruff the Protector, Wonder Canine, Sir Barks - a - Lot" +
                    "Animal: " + capitalizedAnimal + " " +
                    "Names:";
        }
    }



}
