using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IParticipantRepository : IBaseRepository<Participant>
    {
        public Task<IEnumerable<Participant>> FindTournamentParticipants(int tournamentId);
        public Task<IEnumerable<Participant>> FindTournamentParticipant(int participantId, int tournamentId);
    }
}