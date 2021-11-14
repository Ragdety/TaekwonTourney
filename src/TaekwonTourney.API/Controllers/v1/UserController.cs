using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.Responses;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet(ApiRoutes.Users.Me)]
        public async Task<IActionResult> GetMe()
        {
            var userId = UserId;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();
            
            var user = await _userService.GetMe(int.Parse(userId));
            return Ok(user);
        }
    }
}