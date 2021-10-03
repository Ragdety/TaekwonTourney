using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace TaekwonTourney.API.Installers
{
	public static class InstallerExtensions
	{
		/// <summary>
		/// Very complex method to register 
		/// our dependency injection services
		/// </summary>
		/// <param name="services">Service collection</param>
		/// <param name="configuration"></param>
		/// <param name="environment"></param>
        public static void InstallServicesInAssembly(
            this IServiceCollection services,
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
			var type = typeof(Startup);
			var assembly = type.Assembly;
			var exportedTypes = assembly.ExportedTypes;
			var classesImplementingInstaller =
				exportedTypes.Where(x =>
					typeof(IInstaller).IsAssignableFrom(x) &&
					!x.IsInterface &&
					!x.IsAbstract);

			var installers = classesImplementingInstaller
				.Select(Activator.CreateInstance)
				.Cast<IInstaller>()
				.ToList();

			installers.ForEach(installer =>
				installer.InstallServices(configuration, services, environment));
		}
    }
}