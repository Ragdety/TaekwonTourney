using System.Linq;

namespace TaekwonTourney.Core.Models.ViewModels
{
    public class BreakingRankingsViewModel
    {
        public virtual IOrderedEnumerable<BreakingMatch> BreakingMatches { get; set; }
        public int TournamentId { get; set; }
    }
}