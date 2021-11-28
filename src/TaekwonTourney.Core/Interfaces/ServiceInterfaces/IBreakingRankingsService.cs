using System.Threading.Tasks;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface IBreakingRankingsService
    {
        //Task<BreakingRankingsResponse> CreateAsync(BreakingRankings rankings);
        Task<BreakingRankingsResponse> FindByTournamentIdAsync(int tourneyId);
    }
}