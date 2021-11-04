using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
	public interface ITournamentRepository //: IBaseRepository<Tournament>
	{
		Task CreateAsync(Tournament tournament);
		Task<IEnumerable<Tournament>> FindAllAsync();
		Task<Tournament> FindByIdAsync(int tournamentId);
		void Update(Tournament tournament);
		void Delete(Tournament tournament);
		Task<bool> OrganizerOwnsTournament(int organizerId, int tournamentId);
	}
}