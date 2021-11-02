using System.Collections.Generic;

namespace TaekwonTourney.Core.Responses
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}