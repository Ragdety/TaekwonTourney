using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Repositories
{
    public class ParticipantRepository : BaseRepository<Participant>, IParticipantRepository
    {
        private readonly DbSet<Participant> _participants;

        public ParticipantRepository(ApplicationDbContext db) : base(db)
        {
            _participants = db.Set<Participant>();
        }

        public Task<bool> CreateAsync(Participant entity, int tournamentId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Participant>> FindTournamentParticipants(int tournamentId)
        {
            return await _participants
                .Where(x => x.TournamentId == tournamentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Participant>> FindTournamentParticipant(int participantId, int tournamentId)
        {
            return await _participants
                .Where(x => x.TournamentId == tournamentId && x.Id == participantId)
                .ToListAsync();
        }
    }
}