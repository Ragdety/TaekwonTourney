using System;
using System.Collections.Generic;

namespace TaekwonTourney.Core.DomainObjects
{
    public class AuthenticationResult
    {
        public string Token { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        //public string RefreshToken { get; set; }
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}