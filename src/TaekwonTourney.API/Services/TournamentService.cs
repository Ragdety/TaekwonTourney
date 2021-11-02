using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Services
{
    public class TournamentService : ITournamentService
    {
        public Task<IEnumerable<Tournament>> ListAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<SaveTournamentResponse> SaveAsync(Tournament tournament)
        {
            throw new System.NotImplementedException();
        }
    }
}