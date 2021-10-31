using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.API.Extensions;
using TaekwonTourney.API.Services;
using TaekwonTourney.Contracts.Responses;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Controllers.v1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
				return NotFound(new ApiGeneralResponse() 
				{
					Status = 404,
					Success = false,
					Messages = new []{ "No tournaments were found" }
				});

			return Ok(new ApiResponse<IEnumerable<Tournament>>(tournaments));   
		}

		[HttpGet(ApiRoutes.Tournaments.Get)]
		public async Task<IActionResult> Get([FromRoute] int tournamentId)
		{
			var tournament = await _tournamentRepository.FindByIdAsync(tournamentId);
			if(tournament == null)
				return NotFound(new ApiGeneralResponse 
				{
					Status = 404,
					Success = false,
					Messages = new []{ $"No tournament found with ID: {tournamentId}" }
				});

			return Ok(new ApiResponse<Tournament>(tournament));  
		}

		[HttpPost(ApiRoutes.Tournaments.Create)]
		public async Task<IActionResult> Create([FromBody] TournamentCreationModel tournamentToAdd)
		{
			var tournament = new Tournament
			{
				TournamentName = tournamentToAdd.TournamentName,
				TournamentType = tournamentToAdd.TournamentType,
				TournamentDate = tournamentToAdd.TournamentDate,
				OrganizerId = int.Parse(HttpContext.GetUserId()),
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
			var organizerOwnsTournament = await
				_tournamentRepository.OrganizerOwnsTournament(
					tournamentId, 
					int.Parse(HttpContext.GetUserId()));

			if (!organizerOwnsTournament)
				return BadRequest(new ApiGeneralResponse
				{
					Status = 400,
					Success = false,
					Messages = new []{ "You do not own this tournament" }
				});
			
			var tournament = await _tournamentRepository.FindByIdAsync(tournamentId);

			if(tournament == null)
				return NotFound(new ApiGeneralResponse 
				{
					Status = 404,
					Success = false,
					Messages = new []{ $"No tournament found with ID: {tournamentId}" }
				});
			tournament.TournamentName = tournamentToCreate.TournamentName;
			tournament.TournamentType = tournamentToCreate.TournamentType;
			tournament.TournamentDate = tournamentToCreate.TournamentDate;

			var updated = await _tournamentRepository.UpdateAsync(tournament);
			
			if(updated)
			   return Ok(new ApiGeneralResponse
			   {
				   Status = 200,
				   Success = true,
				   Messages = new[] {$"Tournament updated with ID: {tournamentId}"}
			   });
			
			return NotFound(new ApiGeneralResponse
			{
				Status = 404,
				Success = false,
				Messages = new []{ $"No tournament found with ID: {tournamentId}" }
			});
		}

		[HttpDelete(ApiRoutes.Tournaments.Delete)]
		public async Task<IActionResult> Delete([FromRoute] int tournamentId)
	    {
		    var tournamentToDelete = await _tournamentRepository.FindByIdAsync(tournamentId);
		    
		    if(tournamentToDelete == null)
			    return NotFound(new ApiGeneralResponse 
			    {
				    Status = 404,
				    Success = false,
				    Messages = new []{ $"No tournament found with ID: {tournamentId}" }
			    });

		    await _tournamentRepository.DeleteAsync(tournamentToDelete);
		    return NoContent();
	    }
	}
}