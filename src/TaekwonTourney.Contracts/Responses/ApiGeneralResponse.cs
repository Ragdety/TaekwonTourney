using System.Collections.Generic;

namespace TaekwonTourney.Contracts.Responses
{
    public class ApiGeneralResponse
    {
        public int Status { get; set; }
        public bool Success { get; set; }
        public IEnumerable<string> Messages { get; set; }
    }
}