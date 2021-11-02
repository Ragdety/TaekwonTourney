using System.Collections.Generic;
using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using TaekwonTourney.API.Extensions;
using TaekwonTourney.Contracts.Responses;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
    public class ParticipantsController : Controller
    {
        private readonly IParticipantRepository _participantRepository;
        private readonly IUriService _uriService;
        
        public ParticipantsController(IParticipantRepository participantRepository)
        {
            _participantRepository = participantRepository;
        }
        
        [HttpPost(ApiRoutes.TournamentParticipants.CreateParticipant)]
        public async Task<IActionResult> AddTournamentParticipant(
            [FromBody] ParticipantCreationModel participantToAdd, 
            [FromRoute] int tournamentId)
        {
           var TournamentParticipant = new Participant
           {
               FirstName = participantToAdd.FirstName,
               LastName = participantToAdd.LastName,
               DateOfBirth = participantToAdd.DateOfBirth,
               BeltLevel = participantToAdd.BeltLevel,
               BlackBeltLevel = participantToAdd.BlackBeltLevel,
               //IsBlackBelt = null,
               TournamentId = tournamentId,
               Tournament = null
               
           };

           var successful = await _participantRepository.CreateAsync(TournamentParticipant);

           if (successful)
           {
               var locationUri = _uriService.GetParticipantUri(TournamentParticipant.Id.ToString(),TournamentParticipant.TournamentId.ToString());
               return Created(locationUri, TournamentParticipant);
           }
            return BadRequest();
        }


        [HttpPost(ApiRoutes.TournamentParticipants.GetTournamentParticipant)]
        public async Task<IActionResult> GetTournamentParticipant(
            [FromRoute] int participantId, 
            [FromRoute] int tournamentId)
        {
            var participant = await _participantRepository.FindTournamentParticipant(participantId,tournamentId);
            if(participant == null)
               return NotFound(new ApiGeneralResponse
               {
                   Status = 404,
                   Success = false,
                   Messages = new []{ $"No participant found within tournament {tournamentId} with ID: {participantId}" }
               });
                
            return Ok(new ApiResponse<Participant>(participant));
           // throw new System.NotImplementedException();
        }
        
        [HttpPost(ApiRoutes.TournamentParticipants.GetAllTournamentParticipants)]
        public async Task<IActionResult> GetAllTournamentParticipants([FromRoute] int tournamentId)
        {
            var participants = await _participantRepository.FindTournamentParticipants(tournamentId);
            if(participants == null)
               return NotFound(new ApiGeneralResponse()
               {
                   Status = 404,
                   Success = false,
                   Messages = new []{"No participants were found" }
               });

            return Ok(new ApiResponse<IEnumerable<Participant>>(participants));
            //throw new System.NotImplementedException();
        }
    }
}