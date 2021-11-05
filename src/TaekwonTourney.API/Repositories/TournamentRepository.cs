using System.Collections.Generic;
using System.Linq;
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
	public class TournamentRepository : BaseRepository, ITournamentRepository
	{
		public TournamentRepository(ApplicationDbContext db) : base(db)
		{
		}

		public async Task CreateAsync(Tournament tournament)
		{
			await _db.Tournaments.AddAsync(tournament);
		}
		
		public async Task<IEnumerable<Tournament>> FindAllAsync()
		{
			return await _db.Tournaments.ToListAsync();
		}
		
		public async Task<Tournament> FindByIdAsync(int tournamentId)
		{
			return await _db.Tournaments.FindAsync(tournamentId);
		}

		public void Update(Tournament tournament)
		{
			_db.Tournaments.Update(tournament);
		}

		public void Delete(Tournament tournament)
		{
			_db.Tournaments.Remove(tournament);
		}

		public async Task<bool> OrganizerOwnsTournament(int organizerId, int tournamentId)
		{
			var tournaments = await _db.Tournaments
				.AsNoTracking()
				.Where(t => t.OrganizerId == organizerId)
				.ToListAsync();

			var tournament = tournaments?.Find(t => t.Id == tournamentId);
			return tournament == null;
		}
	}
}