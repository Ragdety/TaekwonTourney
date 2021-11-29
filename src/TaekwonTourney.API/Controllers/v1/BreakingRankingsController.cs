using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;

namespace TaekwonTourney.API.Controllers.v1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class BreakingRankingsController : ApiController
    {
        private readonly IBreakingRankingsService _breakingRankingsService;
        
        public BreakingRankingsController(
            IBreakingRankingsService breakingRankingsService)
        {
            _breakingRankingsService = breakingRankingsService;
        }
        
        [AllowAnonymous]
        [HttpGet(ApiRoutes.Rankings.GetTournamentRankings)]
        public async Task<IActionResult> GetBreakingRankings([FromRoute] int tournamentId)
        {
            var response = await _breakingRankingsService.FindByTournamentIdAsync(tournamentId);
            if(!response.Success)
                return NotFound(response);
            return Ok(response.BreakingRankings);
        }
    }
}