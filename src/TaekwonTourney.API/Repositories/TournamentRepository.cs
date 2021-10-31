using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Repositories
{
	/// <summary>
	/// Repository to query tournament related data from database
	/// </summary>
	public class TournamentRepository : BaseRepository<Tournament>, ITournamentRepository
	{
		private readonly DbSet<Tournament> _tournaments;

		public TournamentRepository(ApplicationDbContext db) : base(db)
		{
			_tournaments = db.Set<Tournament>();
		}

		public async Task<bool> OrganizerOwnsTournament(int organizerId, int tournamentId)
		{
			var tournament = await _tournaments
				.AsNoTracking()
				.SingleOrDefaultAsync(x => 
					x.Id == tournamentId && x.OrganizerId == organizerId);

			if (tournament == null)
				return false;

			return tournament.OrganizerId == organizerId;
		}
	}
}