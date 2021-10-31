using System;
using System.Collections.Generic;
using System.Linq;
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
					Name = "Authorization",
					Description = "JWT Authorization header using the bearer scheme",
					In = ParameterLocation.Header,
					Type = SecuritySchemeType.ApiKey,
					Scheme = "Bearer",
					BearerFormat = "JWT"
				};
				
				var security = new OpenApiSecurityRequirement
				{
					{  
						new OpenApiSecurityScheme  
						{  
							Reference = new OpenApiReference  
							{  
								Type = ReferenceType.SecurityScheme,  
								Id = "Bearer"  
							}  
						},
                        Array.Empty<string>()
                    } 
				};
				
				c.AddSecurityDefinition("Bearer", securityScheme);
				
				c.AddSecurityRequirement(security);
			});
			
			services.AddSwaggerGen (c =>
			{
				c.ResolveConflictingActions (apiDescriptions => apiDescriptions.First());
			});
		}
	}
}