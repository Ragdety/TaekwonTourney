using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.Models
{
	public class Tournament : BaseModel<int>
	{
		public string TournamentName { get; set; }
		public TournamentType TournamentType { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int OrganizerId { get; set; }
		
		[ForeignKey(nameof(OrganizerId))]
		public virtual User Organizer { get; set; }
		public ICollection<Participant> Participants { get; set; }
		
		//TODO: Check this later to match user accounts if participants decide to create one
		//This might be hard to implement^
		//public ICollection<User> ParticipantsUserAccounts { get; set; }
	}
}