using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Controllers.v1
{
    public class ParticipantsController : Controller
    {
        private readonly IParticipantRepository _participantRepository;
        
        public ParticipantsController(IParticipantRepository participantRepository)
        {
            _participantRepository = participantRepository;
        }
        
        [HttpPost(ApiRoutes.TournamentParticipants.CreateParticipant)]
        public IActionResult AddTournamentParticipant(
            [FromBody] ParticipantCreationModel participantToAdd, 
            [FromRoute] int tournamentId)
        {
            throw new System.NotImplementedException();
        }
        
        [HttpPost(ApiRoutes.TournamentParticipants.GetTournamentParticipant)]
        public IActionResult GetTournamentParticipant(
            [FromRoute] int participantId, 
            [FromRoute] int tournamentId)
        {
            throw new System.NotImplementedException();
        }
        
        [HttpPost(ApiRoutes.TournamentParticipants.GetAllTournamentParticipants)]
        public IActionResult GetAllTournamentParticipants([FromRoute] int tournamentId)
        {
            throw new System.NotImplementedException();
        }
    }
}