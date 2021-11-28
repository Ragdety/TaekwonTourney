using System.Threading.Tasks;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IBreakingRankingsRepository
    {
        Task CreateAsync(BreakingRankings rankings);
        Task<BreakingRankings> FindByTournamentIdAsync(int tourneyId);
    }
}