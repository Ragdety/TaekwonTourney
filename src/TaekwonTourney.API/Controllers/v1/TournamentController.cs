using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Controllers.v1
{
	public class TournamentController : Controller
	{
		//Will use the repo in controller to get what we need
		private readonly ITournamentRepository _tournamentRepository;

		public TournamentController(ITournamentRepository tournamentRepository)
		{
			_tournamentRepository = tournamentRepository;
		}

		[HttpGet(ApiRoutes.Tournaments.GetAll)]
		public IActionResult GetAll()
		{
			throw new System.NotImplementedException();
		}

		[HttpGet(ApiRoutes.Tournaments.Get)]
		public IActionResult Get([FromRoute] int tournamentId)
		{
			throw new System.NotImplementedException();
		}

		[HttpPost(ApiRoutes.Tournaments.Create)]
		public IActionResult Create()
		{
			throw new System.NotImplementedException();
		}

		[HttpPut(ApiRoutes.Tournaments.Update)]
		public IActionResult Update()
		{
			throw new System.NotImplementedException();
		}

		[HttpDelete(ApiRoutes.Tournaments.Delete)]
		public IActionResult Delete()
		{
			throw new System.NotImplementedException();
		}
	}
}