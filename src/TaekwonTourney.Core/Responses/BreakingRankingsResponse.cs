using TaekwonTourney.Contracts.Responses.Abstractions;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Models.ViewModels;

namespace TaekwonTourney.Core.Responses
{
    public class BreakingRankingsResponse : BaseResponse
    {
        public BreakingRankingsViewModel BreakingRankings { get; private set; }
        
        private BreakingRankingsResponse(
            bool success, 
            string message, 
            BreakingRankingsViewModel breakingRankings) : base(success, message)
        {
            BreakingRankings = breakingRankings;
        }
        
        public BreakingRankingsResponse(BreakingRankingsViewModel breakingRankings) : 
            this(true, string.Empty, breakingRankings)
        { }

        public BreakingRankingsResponse(string message) : this(false, message, null)
        { }
    }
}