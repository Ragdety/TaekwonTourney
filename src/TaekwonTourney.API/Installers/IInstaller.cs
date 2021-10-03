using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

namespace TaekwonTourney.API.Installers
{
	public interface IInstaller
	{
		void InstallServices(
			IConfiguration configuration,
			IServiceCollection services,
			IWebHostEnvironment environment);
	}
}