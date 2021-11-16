using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface ITournamentService
    {
        Task<IEnumerable<Tournament>> ListAsync(int userId);
        Task<Tournament> FindByIdAsync(int id);
        Task<TournamentResponse> CreateAsync(Tournament tournament);
        Task<TournamentResponse> UpdateAsync(int id, TournamentCreationModel tournament);
        Task<TournamentResponse> DeleteAsync(int id);
        Task<bool> OrganizerOwnsTournament(int organizerId, int tournamentId);
    }
}