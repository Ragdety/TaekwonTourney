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
		public async Task<IActionResult> GetAll()
		{
            var tournaments = await _tournamentRepository.FindAllAsync();
			if (tournaments == null)
			   return NotFound("No tournaments were found");

			return Ok(tournaments);   
		}

		[HttpGet(ApiRoutes.Tournaments.Get)]
		public async Task<IActionResult> Get([FromRoute] int tournamentId)
		{
			var tournament = await _tournamentRepository.FindByIdAsync(tournamentId);
			if(tournament == null)
			   return NotFound($"No tournament found with ID {tournamentId} ");

			return Ok(tournament);
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
		public async Task<IActionResult> Update(
			[FromRoute] int tournamentId,
			[FromBody] TournamentCreationModel tournamentToCreate)
		{
			var tournament = await _tournamentRepository.FindByIdAsync(tournamentId);

			if(tournament == null)
				return NotFound($"No tournament found with ID: {tournamentId}");
			
			tournament.TournamentName = tournamentToCreate.TournamentName;
			tournament.TournamentType = tournamentToCreate.TournamentType;
			tournament.TournamentDate = tournamentToCreate.TournamentDate;
			tournament.Organizer = null;
			tournament.Participants = null;

			var updated = await _tournamentRepository.UpdateAsync(tournament);
			
			if(updated)
			   return Ok($"Tournament updated with ID: {tournamentId}");
			
			return NotFound($"No tournament found with ID: {tournamentId}");
		}

		[HttpDelete(ApiRoutes.Tournaments.Delete)]
		public async Task<IActionResult> Delete([FromRoute] int tournamentId)
	    {
		    var tournamentToDelete = await _tournamentRepository.FindByIdAsync(tournamentId);
		    
		    if(tournamentToDelete == null)
			    return NotFound( new { Error = "Tournament was not found."});

		    await _tournamentRepository.DeleteAsync(tournamentToDelete);
		    return NoContent();
	    }
	}
}