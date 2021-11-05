using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IParticipantRepository
    {
        Task CreateAsync(Participant participant);
        void Delete(Participant participant);
        Task<IEnumerable<Participant>> FindTournamentParticipants(int tournamentId);
        Task<Participant> FindTournamentParticipant(int participantId, int tournamentId);
    }
}