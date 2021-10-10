using System;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.DomainObjects.DomainModels
{
    public class TournamentCreationModel
    {
        public string TournamentName { get; set; }
        public TournamentType TournamentType { get; set; }
        public DateTime TournamentDate { get; set; }
    }
}