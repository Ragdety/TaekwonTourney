using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaekwonTourney.API.Database;
using TaekwonTourney.Models;

namespace TaekwonTourney.API.Installers
{
	public class DatabaseInstaller : IInstaller
	{
		public void InstallServices(
			IConfiguration configuration,
			IServiceCollection services,
			IWebHostEnvironment environment)
		{
			var connectionString = configuration.GetConnectionString("TaekwonTourneyDev");

			services.AddDbContext<ApplicationDbContext>(options =>
				options.UseSqlServer(connectionString));
			services.AddIdentity<User, IdentityRole<int>>(options =>
			{
				options.Password.RequiredLength = 8;
				options.Password.RequireLowercase = true;
				options.Password.RequireUppercase = true;
				options.Password.RequireNonAlphanumeric = false;
			})
			.AddRoles<IdentityRole<int>>()
			.AddEntityFrameworkStores<ApplicationDbContext>();
		}
	}
}