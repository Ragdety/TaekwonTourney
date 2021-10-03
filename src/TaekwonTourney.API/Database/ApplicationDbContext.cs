using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.Models;

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
		public DbSet<Tournament> Tournamets { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			//To rename from AspNetUsers -> Users
			builder.Entity<User>()
				.ToTable("Users");
		}
	}
}