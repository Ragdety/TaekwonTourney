using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
    public class IdentityController : Controller
    {
        private readonly IIdentityRepository _identityRepository;
        private readonly ILogger<IdentityController> _logger;

        public IdentityController(
            IIdentityRepository identityRepository, 
            ILogger<IdentityController> logger)
        {
            _identityRepository = identityRepository;
            _logger = logger;
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
                Token = authResponse.Token,
                ValidTo = authResponse.ValidTo
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

            //_logger.LogInformation("Now: {0}", DateTime.UtcNow.ToLocalTime().ToString());
            //_logger.LogInformation("JWT is validTo: {0}", authResponse.ValidTo.ToString());
            
            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token,
                ValidFrom = authResponse.ValidFrom,
                ValidTo = authResponse.ValidTo
            });
        }
    }
}