using System;
using Microsoft.AspNetCore.Identity;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.Models
{
	public class User : IdentityUser<int>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public UserRole UserRole { get; set; }
		public DateTime RegisterDate { get; set; }
		
		public string Something { get; set; }
	}
}