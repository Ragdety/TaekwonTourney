using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.API.Services;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Controllers.v1
{
	public class TournamentController : Controller
	{
		//Will use the repo in controller to get what we need
		private readonly ITournamentRepository _tournamentRepository;
		private readonly IUriService _uriService;

		public TournamentController(ITournamentRepository tournamentRepository, IUriService uriService)
		{
			_tournamentRepository = tournamentRepository;
			_uriService = uriService;
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
		public async Task<IActionResult> Create([FromBody] TournamentCreationModel tournamentToAdd)
		{
			var tournament = new Tournament
			{
				TournamentName = tournamentToAdd.TournamentName,
				TournamentType = tournamentToAdd.TournamentType,
				TournamentDate = tournamentToAdd.TournamentDate,
				Organizer = null,
				Participants = null
			};

			var successful = await _tournamentRepository.CreateAsync(tournament);

			if (successful)
			{
				var locationUri = _uriService.GetTournamentUri(tournament.Id.ToString());
				return Created(locationUri, tournament);
			}
			return BadRequest();
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