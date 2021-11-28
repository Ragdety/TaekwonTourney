using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Repositories
{
    public class BreakingMatchRepository : BaseRepository, IBreakingMatchRepository
    {
        public BreakingMatchRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task CreateAsync(BreakingMatch match)
        {
            await _db.BreakingMatches.AddAsync(match);
        }

        public async Task<BreakingMatch> GetAsync(int tourneyId, int matchId)
        {
            return await _db.BreakingMatches.SingleOrDefaultAsync(m => m.Id == matchId);
        }

        public async Task<bool> IsParticipantMatched(int participantId)
        {
            var match = await _db.BreakingMatches.SingleOrDefaultAsync(m => 
                m.ParticipantId == participantId);
            
            var isPartMatched = match != null;
            return isPartMatched;
        }

        public void UpdateScore(BreakingMatch match)
        {
            _db.BreakingMatches.Update(match);
        }

        public async Task<IList<BreakingMatch>> GetAllFromTourneyAsync(int tourneyId)
        {
            var participants = await _db.Participants
                .Where(p => p.TournamentId == tourneyId).ToListAsync();

            return participants.Select(participant => 
                _db.BreakingMatches
                    .FirstOrDefault(m => m.ParticipantId == participant.Id))
                .Where(match => match != null).ToList();
        }
    }
}