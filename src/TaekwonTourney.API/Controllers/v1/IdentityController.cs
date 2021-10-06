using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

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
            throw new System.NotImplementedException();
        }
        
        [HttpPost(ApiRoutes.Identity.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginModel userToLogin)
        {
            throw new System.NotImplementedException();
        }
    }
}