using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace TaekwonTourney.Core.Models
{
    public class BreakingRankings : BaseModel<int>
    {
        //public virtual IOrderedEnumerable<BreakingMatch> BreakingMatches { get; set; }
        public int TournamentId { get; set; }
        [ForeignKey(nameof(TournamentId))]
        public virtual Tournament Tournament { get; set; }
    }
}