using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TaekwonTourney.API.Hubs;
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
        private readonly IParticipantService _participantService;
        private readonly IHubContext<MatchesHub> _hub;
        
        public BreakingMatchController(
            IBreakingMatchService breakingMatchService, 
            IUriService uriService, 
            IParticipantService participantService, 
            IHubContext<MatchesHub> hub)
        {
            _breakingMatchService = breakingMatchService;
            _uriService = uriService;
            _participantService = participantService;
            _hub = hub;
        }

        [HttpPost(ApiRoutes.Matches.CreateTournamentMatch)]
        public async Task<IActionResult> CreateMatch(
            [FromBody] BreakingMatchCreationModel matchToAdd,
            [FromRoute] int tournamentId)
        {
            var participant = 
                await _participantService.FindTournamentParticipantAsync(
                    matchToAdd.ParticipantId, tournamentId);
            
            var match = new BreakingMatch
            {
                ParticipantScore = matchToAdd.ParticipantScore,
                ParticipantFirstName = participant.FirstName,
                ParticipantLastName = participant.LastName,
                ParticipantId = matchToAdd.ParticipantId
            };
            
            var response = await _breakingMatchService.CreateAsync(tournamentId, match);
            if (!response.Success)
                return NotFound(response);

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
        
        [AllowAnonymous]
        [HttpGet(ApiRoutes.Matches.GetTournamentMatches)]
        public async Task<IActionResult> GetAllMatches([FromRoute] int tournamentId)
        { 
            var matches = 
                await _breakingMatchService.GetAllFromTourneyAsync(tournamentId); 
            return Ok(matches);
        }
    }
}