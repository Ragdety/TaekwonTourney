using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface IParticipantService
    {
        Task<IEnumerable<Participant>> FindAllParticipantsAsync(int tournamentId);
        Task<Participant> FindTournamentParticipantAsync(int id, int tournamentId);
        Task<ParticipantResponse> DeleteAsync(int id, int tournamentId);
        Task<ParticipantResponse> CreateAsync (Participant participant);
    
    }
}

