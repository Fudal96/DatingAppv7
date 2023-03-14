
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        // Now we are changing it and instead of injecting DataContext we inject IUserRopository (it is kind of an abstration of an abstraction but that way it is easier to test our code)

        private readonly IUserRepository _userRepository;
        
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            
        }
        

        // Api Endpoint so that we can request a list of users
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok(await _userRepository.GetUsersAsync());

        }
        
        [HttpGet("{username}")]
        public async Task <ActionResult<AppUser>> GetUser(string username)
        {
            return await _userRepository.GetUserByUsernnameAsync(username);

        }
    }
}