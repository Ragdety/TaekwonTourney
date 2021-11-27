using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaekwonTourney.API.Extensions;
using TaekwonTourney.Contracts.v1;
using TaekwonTourney.Contracts.v1.Queries;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.DomainObjects.DomainModels.Filters;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Controllers.v1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public class TournamentController : ApiController
	{
		private readonly ITournamentService _tournamentService;
		private readonly IUriService _uriService;
		private readonly IMapper _mapper;

		public TournamentController(
			ITournamentService tournamentService, 
			IUriService uriService, 
			IMapper mapper)
		{
			_tournamentService = tournamentService;
			_uriService = uriService;
			_mapper = mapper;
		}

		[HttpGet(ApiRoutes.Tournaments.GetAll)]
		public async Task<IActionResult> GetAll([FromQuery] GetAllTournamentsQuery query)
		{
			var filter = _mapper.Map<GetAllTournamentsFilter>(query);
			return Ok(await _tournamentService.ListAsync(int.Parse(UserId), filter));
		}

		[HttpGet(ApiRoutes.Tournaments.Get)]
		public async Task<IActionResult> Get([FromRoute] int tournamentId)
		{
			var tournament = await _tournamentService.FindByIdAsync(tournamentId);
			if(tournament == null)
				return NotFound(new TournamentResponse($"No tournament found with ID: {tournamentId}"));

			return Ok(tournament);  
		}

		[HttpPost(ApiRoutes.Tournaments.Create)]
		public async Task<IActionResult> Create([FromBody] TournamentCreationModel tournamentToAdd)
		{
			var tournament = new Tournament
			{
				TournamentName = tournamentToAdd.TournamentName,
				TournamentType = tournamentToAdd.TournamentType,
				StartDate = tournamentToAdd.StartDate,
				EndDate = tournamentToAdd.EndDate,
				OrganizerId = int.Parse(HttpContext.GetUserId()),
				Participants = null
			};

			var response = await _tournamentService.CreateAsync(tournament);
			if (!response.Success) return BadRequest(response);
			
			var locationUri = _uriService.GetTournamentUri(tournament.Id.ToString());
			return Created(locationUri, tournament);
		}
		
		[HttpPut(ApiRoutes.Tournaments.Update)]
		public async Task<IActionResult> Update(
			[FromRoute] int tournamentId,
			[FromBody] TournamentCreationModel tournamentToCreate)
		{
			var organizerOwnsTournament = await
				_tournamentService.OrganizerOwnsTournament(
					int.Parse(HttpContext.GetUserId()),
					tournamentId);

			if (organizerOwnsTournament)
				return BadRequest( new TournamentResponse(
					$"You do not own tournament with ID: {tournamentId}"));
			
			var response = await _tournamentService.UpdateAsync(tournamentId, tournamentToCreate);
			
			if(response.Success)
			   return Ok(response.Tournament);
			
			return NotFound(response);
		}

		[HttpDelete(ApiRoutes.Tournaments.Delete)]
		public async Task<IActionResult> Delete([FromRoute] int tournamentId)
	    {
		    var response = await _tournamentService.DeleteAsync(tournamentId);
		    if(!response.Success)
			    return NotFound(response);
		    return NoContent();
	    }
	}
}