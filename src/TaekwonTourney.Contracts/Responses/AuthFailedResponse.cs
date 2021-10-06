using System.Collections.Generic;

namespace TaekwonTourney.Contracts.Responses
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}