using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.Swagger.Model;

namespace TaekwonTourney.API.Installers
{
	public class SwaggerInstaller : IInstaller
	{
		public void InstallServices(
			IConfiguration configuration, 
			IServiceCollection services, 
			IWebHostEnvironment environment)
		{
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "TaekwonTourney.API", Version = "v1" });

				var securityScheme = new OpenApiSecurityScheme
				{
					BearerFormat = "Bearer"
				};
				
				var security = new OpenApiSecurityRequirement
				{
					{securityScheme, Array.Empty<string>()}
				};
				
				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					Description = "JWT Authorization header using the bearer scheme",
					Name = "Authorization",
					In = ParameterLocation.Header,
					Type = SecuritySchemeType.ApiKey
				});
				
				c.AddSecurityRequirement(security);
			});
		}
	}
}