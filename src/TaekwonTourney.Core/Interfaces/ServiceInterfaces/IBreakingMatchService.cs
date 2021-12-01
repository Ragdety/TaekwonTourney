using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface IBreakingMatchService
    {
        Task<BreakingMatchResponse> CreateAsync(int tourneyId, BreakingMatch match);
        Task<BreakingMatch> GetAsync(int tourneyId, int matchId);
        Task<IList<BreakingMatch>> GetAllFromTourneyAsync(int tourneyId);
        Task<BreakingMatchResponse> UpdateScore(int matchId, BreakingMatchUpdateModel match);
    }
}