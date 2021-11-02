using System;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.DomainObjects.DomainModels
{
    public class ParticipantCreationModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public BeltLevel BeltLevel { get; set; }
        public BlackBeltLevel? BlackBeltLevel { get; set; }
    }
}