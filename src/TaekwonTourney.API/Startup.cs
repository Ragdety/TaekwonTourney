using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TaekwonTourney.API.Installers;
using TaekwonTourney.API.Options;

namespace TaekwonTourney.API
{
	public class Startup
	{
		public Startup(
			IConfiguration configuration,
			IWebHostEnvironment environment)
		{
			Configuration = configuration;
			Environment = environment;
		}

		public IConfiguration Configuration { get; }
		public IWebHostEnvironment Environment { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.InstallServicesInAssembly(Configuration, Environment);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				
				var swaggerOptions = new SwaggerOptions();
				Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);
				
				app.UseSwagger(option =>
				{
					option.RouteTemplate = swaggerOptions.JsonRoute;
				});
				app.UseSwaggerUI(option =>
				{
					option.SwaggerEndpoint(swaggerOptions.UIEndpoint, swaggerOptions.Description);
				});
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}