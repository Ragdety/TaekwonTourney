using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Converters;

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
				.AddNewtonsoftJson(options =>
					{
						options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; 
						options.SerializerSettings.Converters.Add(new StringEnumConverter()); 
					}
			);
		}
	}
}