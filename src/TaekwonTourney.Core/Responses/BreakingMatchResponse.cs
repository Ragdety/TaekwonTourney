using TaekwonTourney.Contracts.Responses.Abstractions;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Responses
{
    public class BreakingMatchResponse : BaseResponse
    {
        public BreakingMatch BreakingMatch { get; private set; }
        
        private BreakingMatchResponse(
            bool success, 
            string message, 
            BreakingMatch breakingMatch) : base(success, message)
        {
            BreakingMatch = breakingMatch;
        }
        
        public BreakingMatchResponse(BreakingMatch breakingMatch) : this(true, string.Empty, breakingMatch)
        { }

        public BreakingMatchResponse(string message) : this(false, message, null)
        { }
    }
}