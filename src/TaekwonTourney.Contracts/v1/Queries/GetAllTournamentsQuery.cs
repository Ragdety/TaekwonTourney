using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Contracts.v1.Queries
{
    public class GetAllTournamentsQuery
    {
        public TournamentTime TournamentTime { get; set; }
    }
}