using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Repositories
{
    public class ParticipantRepository : BaseRepository, IParticipantRepository
    {
        public ParticipantRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task CreateAsync(Participant participant)
        {
            await _db.Participants.AddAsync(participant);
        }
        
        public void Delete(Participant participant)
        {
            _db.Participants.Remove(participant);
        }

        public async Task<IEnumerable<Participant>> FindTournamentParticipants(int tournamentId)
        {
            return await _db.Participants
                .Where(x => x.TournamentId == tournamentId)
                .ToListAsync();
        }

        public async Task<Participant> FindTournamentParticipant(int participantId, int tournamentId)
        {
            return await _db.Participants.SingleOrDefaultAsync(
                x => x.TournamentId == tournamentId && x.Id == participantId);
        }
    }
}