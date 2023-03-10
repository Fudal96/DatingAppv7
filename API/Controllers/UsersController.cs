

using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        // in order to inject something we need a constructor. Below we essentially injecting our database using DataContext

        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // Api Endpoint so that we can request a list of users
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }
        
        [HttpGet("{id}")]
        public async Task <ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);

        }
    }
}