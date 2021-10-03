using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServicesInterfaces;
using TaekwonTourney.Models;

namespace TaekwonTourney.API.Services
{
	/// <summary>
	/// Service to access tournament data
	/// </summary>
	public class TournamentService : ITournamentService
	{
		private readonly ITournamentRepository _tournamentRepository;

		public TournamentService(ITournamentRepository tournamentRepository)
		{
			_tournamentRepository = tournamentRepository;
		}

		public async Task<bool> CreateAsync(Tournament tournament)
		{
			return await _tournamentRepository.CreateAsync(tournament);
		}

		public async Task<bool> DeleteAsync(Tournament tournamentToDelete)
		{
			return await _tournamentRepository.DeleteAsync(tournamentToDelete);
		}

		public async Task<IEnumerable<Tournament>> FindAllAsync()
		{
			return await _tournamentRepository.FindAllAsync();
		}

		public async Task<Tournament> FindByIdAsync(int id)
		{
			return await _tournamentRepository.FindByIdAsync(id);
		}

		public async Task<bool> UpdateAsync(Tournament tournamentToUpdate)
		{
			return await _tournamentRepository.UpdateAsync(tournamentToUpdate);
		}
	}
}