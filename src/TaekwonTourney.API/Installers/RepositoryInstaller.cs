using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaekwonTourney.API.Repositories;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Installers
{
	public class RepositoryInstaller : IInstaller
	{
		public void InstallServices(
			IConfiguration configuration,
			IServiceCollection services,
			IWebHostEnvironment environment)
		{
			//This will error since BaseRepo is an abstract class (cannot be instantiated)
			//services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

			services.AddScoped<ITournamentRepository, TournamentRepository>();
		}
	}
}