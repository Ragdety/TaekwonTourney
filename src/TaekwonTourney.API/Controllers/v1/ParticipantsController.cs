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
    public class ParticipantsController : Controller
    {
        private readonly IParticipantService _participantService;
        private readonly IUriService _uriService;
        
        public ParticipantsController(
            IParticipantService participantService, 
            IUriService uriService)
        {
            _participantService = participantService;
            _uriService = uriService;
        }
        
        [HttpPost(ApiRoutes.TournamentParticipants.CreateParticipant)]
        public async Task<IActionResult> CreateParticipant(
            [FromBody] ParticipantCreationModel participantToAdd, 
            [FromRoute] int tournamentId)
        {
           var tournamentParticipant = new Participant
           {
               FirstName = participantToAdd.FirstName,
               LastName = participantToAdd.LastName,
               DateOfBirth = participantToAdd.DateOfBirth,
               BeltLevel = participantToAdd.BeltLevel,
               BlackBeltLevel = participantToAdd.BlackBeltLevel,
               TournamentId = tournamentId,
               Tournament = null
           };
           
           var response = 
               await _participantService.CreateAsync(tournamentParticipant);
           
           if (!response.Success) 
               return BadRequest(response);
           
           var locationUri = _uriService.GetParticipantUri(
               tournamentParticipant.Id.ToString(), 
               tournamentParticipant.TournamentId.ToString()); 
          return Created(locationUri, tournamentParticipant);
        }


        [HttpGet(ApiRoutes.TournamentParticipants.GetTournamentParticipant)]
        public async Task<IActionResult> GetTournamentParticipant(
            [FromRoute] int participantId, 
            [FromRoute] int tournamentId)
        {
            var participant = 
                await _participantService.FindTournamentParticipantAsync(participantId, tournamentId);
            if(participant == null)
               return NotFound(new ParticipantResponse(
                   $"No participant found with ID: {participantId}"));  
                
            return Ok(participant);
        }
        
        [HttpGet(ApiRoutes.TournamentParticipants.GetAllTournamentParticipants)]
        public async Task<IActionResult> GetAllTournamentParticipants([FromRoute] int tournamentId)
        {
            var participants =
                await _participantService.FindAllParticipantsAsync(tournamentId);
            return Ok(participants);
        }
        
        [HttpDelete(ApiRoutes.TournamentParticipants.DeleteParticipant)]
		public async Task<IActionResult> DeleteParticipant(
            [FromRoute] int participantId,
            [FromRoute] int tournamentId)
	    {
		    var response = await _participantService.DeleteAsync(participantId, tournamentId);
		    if(!response.Success) return NotFound(response);
		    return NoContent();
	    }

    }
}