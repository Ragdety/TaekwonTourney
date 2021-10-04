using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Models;

namespace TaekwonTourney.API.Repositories
{
	/// <summary>
	/// Repository to query tournament related data from database
	/// </summary>
	public class TournamentRepository : BaseRepository<Tournament>, ITournamentRepository
	{
		private readonly DbSet<Tournament> _tournaments;
		private ITournamentRepository _tournamentRepositoryImplementation;

		public TournamentRepository(ApplicationDbContext db) : base(db)
		{
			_tournaments = db.Set<Tournament>();
		}
	}
}