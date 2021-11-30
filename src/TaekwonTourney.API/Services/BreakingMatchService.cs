using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Models;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Services
{
    public class BreakingMatchService : IBreakingMatchService
    {
        private readonly IBreakingMatchRepository _breakingMatchRepository;
        private readonly ITournamentRepository _tournamentRepository;
        private readonly IParticipantRepository _participantRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<BreakingMatchService> _logger;

        public BreakingMatchService(
            IBreakingMatchRepository breakingMatchRepository, 
            ITournamentRepository tournamentRepository,
            IUnitOfWork unitOfWork, 
            ILogger<BreakingMatchService> logger, 
            IParticipantRepository participantRepository)
        {
            _breakingMatchRepository = breakingMatchRepository;
            _tournamentRepository = tournamentRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _participantRepository = participantRepository;
        }
        
        public async Task<BreakingMatchResponse> CreateAsync(int tourneyId, BreakingMatch match)
        {
            var tournament = await _tournamentRepository.FindByIdAsync(tourneyId);
            if (tournament == null)
                return new BreakingMatchResponse($"Tournament with ID: {tourneyId} does not exist");

            var participant = 
                await _participantRepository.FindTournamentParticipant(
                    match.ParticipantId, tourneyId);
            
            if (participant == null)
                return new BreakingMatchResponse($"Participant with ID: {match.ParticipantId} does not exist");

            if (await _breakingMatchRepository.IsParticipantMatched(match.ParticipantId))
            {
                return new BreakingMatchResponse(
                    $"Participant with ID: {match.ParticipantId} is already in a match");
            }
            
            try
            {
                await _breakingMatchRepository.CreateAsync(match);
                await _unitOfWork.CompleteAsync();
                return new BreakingMatchResponse(match);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new BreakingMatchResponse(
                    $"An error occurred when creating match: {ex.Message}");
            }
        }

        public async Task<BreakingMatch> GetAsync(int tourneyId, int matchId)
        {
            return await _breakingMatchRepository.GetAsync(tourneyId, matchId);
        }

        public async Task<IList<BreakingMatch>> GetAllFromTourneyAsync(int tourneyId)
        {
            //All matches (no order)
            var matches = await _breakingMatchRepository.GetAllFromTourneyAsync(tourneyId);
            
            //Ordered matches (this is basically rankings endpoint)
            var orderedMatches = matches.OrderByDescending(m => m.ParticipantScore);
            return orderedMatches.ToList();
        }

        public void UpdateScore(int matchId, BreakingMatchUpdateModel match)
        {
            throw new NotImplementedException();
        }
    }
}