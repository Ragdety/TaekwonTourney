using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class BreakingMatchController : ApiController
    {
        private readonly IBreakingMatchService _breakingMatchService;
        private readonly IUriService _uriService;
        
        public BreakingMatchController(
            IBreakingMatchService breakingMatchService, 
            IUriService uriService)
        {
            _breakingMatchService = breakingMatchService;
            _uriService = uriService;
        }

        [HttpPost(ApiRoutes.Matches.CreateTournamentMatch)]
        public async Task<IActionResult> CreateMatch(
            [FromBody] BreakingMatchCreationModel matchToAdd,
            [FromRoute] int tournamentId)
        {
            var match = new BreakingMatch
            {
                ParticipantScore = matchToAdd.ParticipantScore,
                ParticipantId = matchToAdd.ParticipantId
            };
            
            var response = await _breakingMatchService.CreateAsync(tournamentId, match);
            if (!response.Success)
                return NotFound(response.Message);

            return Ok(match);
            
            //var locationUri = _uriService.GetMatchUri(match.Id.ToString(), tournamentId.ToString()); 
            //return Created(locationUri, match);
        }

        // [HttpGet(ApiRoutes.Matches.GetTournamentMatch)]
        // public Task<IActionResult> GetMatch(
        //     [FromRoute] int matchId, 
        //     [FromRoute] int tourneyId)
        // {
        //     throw new NotImplementedException();
        //     // var match = await _breakingMatchService.GetAsync(tourneyId, matchId);
        //     // if(match == null)
        //     //     return NotFound(new BreakingMatchResponse($"No match found with ID: {matchId}"));
        //     // return Ok(match);
        // }
        //
        // [HttpGet(ApiRoutes.Matches.GetTournamentMatches)]
        // public async Task<IActionResult> GetAllMatches(
        //     [FromRoute] int tourneyId)
        // {
        //     throw new NotImplementedException();
        //     //var matches = 
        //     //    await _breakingMatchService.GetAllFromTourneyAsync(tourneyId);
        //    // return Ok(matches);
        // }
    }
}