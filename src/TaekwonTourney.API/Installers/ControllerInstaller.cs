using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TaekwonTourney.API.Installers
{
	public class ControllerInstaller : IInstaller
	{
		public void InstallServices(
			IConfiguration configuration, 
			IServiceCollection services, 
			IWebHostEnvironment environment)
		{
			services.AddControllers()
				//To parse enums as strings 
				.AddJsonOptions(options => 
					options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));;
		}
	}
}