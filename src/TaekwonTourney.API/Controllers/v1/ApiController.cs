using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace TaekwonTourney.API.Controllers.v1
{
    [ApiController]
    public class ApiController : ControllerBase
    {
        protected string UserId => GetClaim("id");
        protected string Username => GetClaim("username");
        //protected string Role => 

        private string GetClaim(string claimType) => User.Claims
            .FirstOrDefault(x => x.Type.Equals(claimType))?.Value;
    }
}