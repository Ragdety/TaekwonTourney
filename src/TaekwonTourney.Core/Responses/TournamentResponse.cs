using TaekwonTourney.Contracts.Responses.Abstractions;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Responses
{
    public class TournamentResponse : BaseResponse
    {
        public Tournament Tournament { get; private set; }
        
        private TournamentResponse(
            bool success, 
            string message, 
            Tournament tournament) : base(success, message)
        {
            Tournament = tournament;
        }
        
        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="tournament">Tournament entity.</param>
        /// <returns>Response.</returns>
        public TournamentResponse(Tournament tournament) : this(true, string.Empty, tournament)
        { }

        /// <summary>
        /// Creates an error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public TournamentResponse(string message) : this(false, message, null)
        { }
    }
}