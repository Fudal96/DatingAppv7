

using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/users
    public class UsersController : ControllerBase
    {
        // in order to inject something we need a constructor. Below we essentially injecting our database using DataContext

        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // Api Endpoint so that we can request a list of users
        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            var users = _context.Users.ToList();

            return users;
        }
        
        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUser(int id)
        {
            return _context.Users.Find(id);

        }
    }
}