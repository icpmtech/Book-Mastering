using Book_Guide_MVC.DAL;
using Book_Guide_MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Book_Guide_MVC.Controllers
{
    public class DemoGuide1Controller : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly BookDbContext context;

        public DemoGuide1Controller(ILogger<HomeController> logger, BookDbContext _context)
        {
            _logger = logger;
            this.context = _context;
        }

        public IActionResult Index()
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