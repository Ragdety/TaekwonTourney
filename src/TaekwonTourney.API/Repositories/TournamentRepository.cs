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
		
		
	}
}