using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaekwonTourney.API.Repositories;
using TaekwonTourney.API.Services;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;

namespace TaekwonTourney.API.Installers
{
	public class ServiceInstaller : IInstaller
	{
		public void InstallServices(
			IConfiguration configuration,
			IServiceCollection services,
			IWebHostEnvironment environment)
		{
			services.AddHttpContextAccessor();
			services.AddSingleton<IUriService>(provider =>
			{
				var accessor = provider.GetRequiredService<IHttpContextAccessor>();
				var request = accessor.HttpContext?.Request;
				var absoluteUri = string.Concat(request?.Scheme, "://", request?.Host.ToUriComponent(), "/");
				return new UriService(absoluteUri);
			});
			services.AddScoped<ITournamentService, TournamentService>();
			services.AddScoped<IParticipantService, ParticipantService>();
			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();
		}
	}
}