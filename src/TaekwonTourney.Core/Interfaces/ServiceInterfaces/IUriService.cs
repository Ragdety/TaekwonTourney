using System;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface IUriService
    {
        public Uri GetTournamentUri(string tournamentId);
    }
}