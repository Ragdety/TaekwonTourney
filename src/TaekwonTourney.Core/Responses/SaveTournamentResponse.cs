using TaekwonTourney.Contracts.Responses.Abstractions;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Responses
{
    public class SaveTournamentResponse : BaseResponse
    {
        public Tournament Tournament { get; private set; }
        
        private SaveTournamentResponse(
            bool success, 
            string message, 
            Tournament tournament) : base(success, message)
        {
            Tournament = tournament;
        }
        
        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved tournament.</param>
        /// <returns>Response.</returns>
        public SaveTournamentResponse(Tournament category) : this(true, string.Empty, category)
        { }

        /// <summary>
        /// Creates an error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public SaveTournamentResponse(string message) : this(false, message, null)
        { }
    }
}