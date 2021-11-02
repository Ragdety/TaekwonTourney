using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Database
{
	/// <summary>
	/// Class for database context
	/// </summary>
	public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}

		//These DbSets represent database tables
<<<<<<< HEAD
		public DbSet<Tournament> Tournamets { get; set; }
		//public DbSet<Participant> Participants { get; set; }
=======
		public DbSet<Tournament> Tournaments { get; set; }
		public DbSet<Participant> Participants { get; set; }
>>>>>>> 04af01ec02a74b76df8a838655ec3364a42e8cf1

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			//To rename from AspNetUsers -> Users
			builder.Entity<User>()
				.ToTable("Users");
		}
	}
}