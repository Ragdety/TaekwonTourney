using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.Responses;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
    public class UserController : ApiController
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet(ApiRoutes.Users.Me)]
        public async Task<IActionResult> GetMe()
        {
            var userId = UserId;
            
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new ApiGeneralResponse
                {
                    Status = 400,
                    Success = false,
                    Messages = new []{ "User not logged in" }
                });
            }

            var user = await _userRepository.GetUserProfile(int.Parse(userId));

            if (user != null) 
                return Ok(new ApiResponse<object>(user));
            
            return BadRequest();
        }
    }
}