using System;

namespace TaekwonTourney.Core.Responses
{
    public class AuthSuccessResponse
    {
        public string Token { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
    }
}