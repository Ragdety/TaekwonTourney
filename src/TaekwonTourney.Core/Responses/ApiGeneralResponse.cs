using System.Collections.Generic;

namespace TaekwonTourney.Core.Responses
{
    public class ApiGeneralResponse
    {
        public int Status { get; set; }
        public bool Success { get; set; }
        public IEnumerable<string> Messages { get; set; }
    }
}