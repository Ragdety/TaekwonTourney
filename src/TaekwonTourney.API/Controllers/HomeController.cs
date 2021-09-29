using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaekwonTourney.Contracts.v1;

namespace TaekwonTourney.API.Controllers
{
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet(ApiRoutes.Home)]
		public IActionResult Home()
		{
			return Ok("Welcome Home");
		}
	}
}
