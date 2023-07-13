using Book_Guide_MVC.DAL;
using Book_Guide_MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Book_Guide_MVC.Controllers
{
    /// <summary>
    /// Chat GPT API
    /// </summary>
    public class ChatGptController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly BookDbContext _context;
        public ChatGptController(ILogger<HomeController> logger, BookDbContext context)
        {
            _logger = logger;
            _context = _context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}