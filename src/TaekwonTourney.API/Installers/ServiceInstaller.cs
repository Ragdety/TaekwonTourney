using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaekwonTourney.API.Services;
using TaekwonTourney.Core.Interfaces.ServicesInterfaces;

namespace TaekwonTourney.API.Installers
{
	public class ServiceInstaller : IInstaller
	{
		public void InstallServices(
			IConfiguration configuration,
			IServiceCollection services,
			IWebHostEnvironment environment)
		{
			services.AddScoped<ITournamentService, TournamentService>();
		}
	}
}