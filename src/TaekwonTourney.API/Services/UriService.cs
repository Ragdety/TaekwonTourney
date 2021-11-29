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
        public Uri GetParticipantUri(string participantId,string tournamentId)
        {
            return new Uri(_baseUri + ApiRoutes.TournamentParticipants.GetTournamentParticipant
                                                 .Replace("{participantId}", participantId)
                                                 .Replace("{tournamentId}", tournamentId));
        }

        public Uri GetMatchUri(string matchId, string tournamentId)
        {
            throw new NotImplementedException();
            // return new Uri(_baseUri + ApiRoutes.Matches.GetTournamentMatch
            //     .Replace("{tournamentId}", tournamentId)
            //     .Replace("{matchId}", matchId));
        }

        public Uri GetRankingsUri(string rankingsId, string tournamentId)
        {
            throw new NotImplementedException();
        }
    }
}