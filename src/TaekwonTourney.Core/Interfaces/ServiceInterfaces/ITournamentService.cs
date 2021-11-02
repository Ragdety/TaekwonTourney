using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface ITournamentService
    {
        Task<IEnumerable<Tournament>> ListAsync();
        Task<SaveTournamentResponse> SaveAsync(Tournament tournament);
    }
}