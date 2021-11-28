using System.ComponentModel.DataAnnotations.Schema;

namespace TaekwonTourney.Core.Models
{
    public class BreakingMatch : BaseModel<int>
    {
        public int ParticipantScore { get; set; }
        
        public int ParticipantId { get; set; }

        // public int TournamentId { get; set; }
        // [ForeignKey(nameof(TournamentId))] 
        // public Tournament Tournament { get; set; }
    }
}