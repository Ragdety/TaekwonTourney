using TaekwonTourney.Contracts.Responses.Abstractions;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Responses
{
    public class ParticipantResponse : BaseResponse
    {
        public Participant Participant { get; private set; }
        
        private ParticipantResponse(
            bool success, 
            string message, 
            Participant participant) : base(success, message)
        {
            Participant = participant;
        }
        
        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="participant">Participant entity.</param>
        /// <returns>Response.</returns>
        public ParticipantResponse(Participant participant) : this(true, string.Empty, participant)
        { }

        /// <summary>
        /// Creates an error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public ParticipantResponse(string message) : this(false, message, null)
        { }
    }
}