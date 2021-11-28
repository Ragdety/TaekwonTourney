using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Repositories
{
    public class BreakingRankingsRepository : BaseRepository, IBreakingRankingsRepository
    {
        public BreakingRankingsRepository(ApplicationDbContext db) : base(db)
        {
        }
        
        public async Task CreateAsync(BreakingRankings rankings)
        {
            await _db.BreakingRankings.AddAsync(rankings);
        }

        public async Task<BreakingRankings> FindByTournamentIdAsync(int tourneyId)
        {
            return await _db.BreakingRankings.SingleOrDefaultAsync(r => 
                r.TournamentId == tourneyId);
        }
    }
}