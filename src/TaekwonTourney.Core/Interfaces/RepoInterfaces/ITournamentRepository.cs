using System.Threading.Tasks;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
	public interface ITournamentRepository : IBaseRepository<Tournament>
	{
		public Task<bool> OrganizerOwnsTournament(int organizerId, int tournamentId);
	}
}