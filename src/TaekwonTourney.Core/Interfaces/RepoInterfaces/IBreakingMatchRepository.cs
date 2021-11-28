using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IBreakingMatchRepository
    {
        Task CreateAsync(BreakingMatch match);
        Task<BreakingMatch> GetAsync(int tourneyId, int matchId);
        Task<bool> IsParticipantMatched(int participantId);
        void UpdateScore(BreakingMatch match);
        Task<IList<BreakingMatch>> GetAllFromTourneyAsync(int tourneyId);
    }
}