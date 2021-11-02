using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
    public class IdentityController : Controller
    {
        private readonly IIdentityRepository _identityRepository;
        
        public IdentityController(IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
        }

        [HttpPost(ApiRoutes.Identity.Register)]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegisterModel userToRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = ModelState.Values.SelectMany(x => x.Errors.Select(y => y.ErrorMessage))
                });
            }
            
            var authResponse = await _identityRepository.RegisterAsync(userToRegister);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }
            
            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token
            });
        }
        
        [HttpPost(ApiRoutes.Identity.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginModel userToLogin)
        {
            var authResponse = await _identityRepository.LoginAsync(userToLogin);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }
            
            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token
            });
        }
    }
}