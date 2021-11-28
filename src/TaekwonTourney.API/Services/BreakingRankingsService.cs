using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Models.ViewModels;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Services
{
    public class BreakingRankingsService : IBreakingRankingsService
    {
        private readonly IBreakingRankingsRepository _breakingRankingsRepository;
        private readonly ITournamentRepository _tournamentRepository;
        private readonly IBreakingMatchService _breakingMatchService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<BreakingRankingsService> _logger;
        
        public BreakingRankingsService(
            IBreakingRankingsRepository breakingRankingsRepository, 
            IUnitOfWork unitOfWork, 
            ILogger<BreakingRankingsService> logger, 
            IBreakingMatchService breakingMatchService, 
            ITournamentRepository tournamentRepository)
        {
            _breakingRankingsRepository = breakingRankingsRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _breakingMatchService = breakingMatchService;
            _tournamentRepository = tournamentRepository;
        }
        
        
        public async Task<BreakingRankingsResponse> FindByTournamentIdAsync(int tourneyId)
        {
            var tournament =
                await _tournamentRepository.FindByIdAsync(tourneyId);
        
            if (tournament == null)
                return new BreakingRankingsResponse($"No tournament found with ID: {tourneyId}");

            var matches = 
                await _breakingMatchService.GetAllFromTourneyAsync(tourneyId);
            
            var orderedMatches = matches.OrderByDescending(m => m.ParticipantScore);
            //rankings.BreakingMatches = orderedMatches;
            var rankings = new BreakingRankingsViewModel
            {
                TournamentId = tourneyId,
                BreakingMatches = orderedMatches
            };
            return new BreakingRankingsResponse(rankings);
        }

        // public async Task<BreakingRankingsResponse> FindByTournamentIdAsync(int tourneyId)
        // {
        //     var tournament =
        //         await _tournamentRepository.FindByIdAsync(tourneyId);
        //
        //     if (tournament == null)
        //         return new BreakingRankingsResponse($"No tournament found with ID: {tourneyId}");
        //     
        //     var rankings = 
        //         await _breakingRankingsRepository.FindByTournamentIdAsync(tourneyId);
        //
        //     if (rankings == null)
        //     {
        //         var rankingsModel = new BreakingRankings
        //         {
        //             BreakingMatches = null,
        //             TournamentId = tourneyId
        //         };
        //
        //         var res = await CreateAsync(rankingsModel);
        //         if (!res.Success)
        //             return res;
        //     }
        //     var matches = 
        //         await _breakingMatchService.GetAllFromTourneyAsync(tourneyId);
        //     
        //     var orderedMatches = matches.OrderBy(m => m.ParticipantScore);
        //     rankings.BreakingMatches = orderedMatches;
        //     
        //     return new BreakingRankingsResponse(rankings);
        // }
        //
        // private async Task<BreakingRankingsResponse> CreateAsync(BreakingRankings rankings)
        // {
        //     try
        //     {
        //         await _breakingRankingsRepository.CreateAsync(rankings);
        //         await _unitOfWork.CompleteAsync();
        //         return new BreakingRankingsResponse(rankings);
        //     }
        //     catch (Exception ex)
        //     {
        //         _logger.LogError(ex.Message);
        //         _logger.LogError(ex.StackTrace);
        //         return new BreakingRankingsResponse(
        //             $"An error occurred when creating rankings: {ex.Message}");
        //     }
        // }
    }
}