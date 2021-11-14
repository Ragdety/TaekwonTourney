using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Services
{
    public class TournamentService : ITournamentService
    {
        private readonly ITournamentRepository _tournamentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<TournamentService> _logger;

        public TournamentService(
            ITournamentRepository tournamentRepository, 
            IUnitOfWork unitOfWork, ILogger<TournamentService> logger)
        {
            _tournamentRepository = tournamentRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
        
        public async Task<IEnumerable<Tournament>> ListAsync()
        {
            return await _tournamentRepository.FindAllAsync();
        }

        public async Task<Tournament> FindByIdAsync(int id)
        {
            return await _tournamentRepository.FindByIdAsync(id);
        }

        public async Task<TournamentResponse> CreateAsync(Tournament tournament)
        {
            try
            {
                await _tournamentRepository.CreateAsync(tournament);
                await _unitOfWork.CompleteAsync();
                return new TournamentResponse(tournament);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new TournamentResponse(
                    $"An error occurred when creating tournament: {ex.Message}");
            }
        }

        public async Task<TournamentResponse> UpdateAsync(int id, TournamentCreationModel tournament)
        {
            var existingTournament = await _tournamentRepository.FindByIdAsync(id);

            if (existingTournament == null)
                return new TournamentResponse("Tournament not found.");

            existingTournament.TournamentName = tournament.TournamentName;
            //existingTournament.StartDate = Tournament.StartDate;
            //existingTournament.EndDate = Tournament.EndDate;
            existingTournament.TournamentType = tournament.TournamentType;

            try
            {
                _tournamentRepository.Update(existingTournament);
                await _unitOfWork.CompleteAsync();
                return new TournamentResponse(existingTournament);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new TournamentResponse(
                    $"An error occurred when updating the tournament: {ex.Message}");
            }
        }

        public async Task<TournamentResponse> DeleteAsync(int id)
        {
            var existingTournament = await _tournamentRepository.FindByIdAsync(id);

            if (existingTournament == null)
                return new TournamentResponse("Tournament not found.");

            try
            {
                _tournamentRepository.Delete(existingTournament);
                await _unitOfWork.CompleteAsync();
                return new TournamentResponse(existingTournament);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new TournamentResponse(
                    $"An error occurred when deleting the tournament: {ex.Message}");
            }
        }

        public Task<bool> OrganizerOwnsTournament(int organizerId, int tournamentId)
        {
            return _tournamentRepository.OrganizerOwnsTournament(organizerId, tournamentId);
        }
    }
}