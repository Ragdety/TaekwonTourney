using System;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;

namespace TaekwonTourney.API.Services
{
    public class UriService : IUriService
    {
        private readonly string _baseUri;
        
        public UriService(string baseUri)
        {
            _baseUri = baseUri;
        }
        
        public Uri GetTournamentUri(string tournamentId)
        {
            return new Uri(_baseUri + ApiRoutes.Tournaments.Get.Replace("{tournamentId}", tournamentId));
        }
    }
}