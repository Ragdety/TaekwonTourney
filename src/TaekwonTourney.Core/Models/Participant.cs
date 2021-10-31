using System;
using System.ComponentModel.DataAnnotations.Schema;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.Models
{
    public class Participant : BaseModel<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public BeltLevel BeltLevel { get; set; }
        
        //Will do checks here to see if is blackbelt
        public BlackBeltLevel? BlackBeltLevel { get; set; }

        public bool IsBlackBelt => BeltLevel.Equals(BeltLevel.BlackBelt);

        public int TournamentId { get; set; }
        [ForeignKey(nameof(TournamentId))]
        public virtual Tournament Tournament { get; set; }
    }
}