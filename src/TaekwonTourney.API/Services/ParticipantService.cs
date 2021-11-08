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
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRepository _participantRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ParticipantService> _logger;

        public ParticipantService(
            IParticipantRepository participantRepository, 
            IUnitOfWork unitOfWork, ILogger<ParticipantService> logger)
        {
            _participantRepository = participantRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<Participant> FindTournamentParticipantAsync(int id, int tournamentId)
        {
            return await _participantRepository.FindTournamentParticipant(id, tournamentId);
        }

        public async Task<IEnumerable<Participant>> FindAllParticipantsAsync(int tournamentId)
        {
            return await _participantRepository.FindTournamentParticipants(tournamentId);
        }
        
        public async Task<ParticipantResponse> DeleteAsync(int id, int tournamentId)
        {
            var existingParticipant = await _participantRepository.FindTournamentParticipant(id, tournamentId);

            if(existingParticipant == null)
                return new ParticipantResponse("Participant not found");

            try
            {
                _participantRepository.Delete(existingParticipant);
                await _unitOfWork.CompleteAsync();
                return new ParticipantResponse(existingParticipant);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new ParticipantResponse(
                    $"An error occurred when deleting the participant: {ex.Message}");        
            }
        }

        public async Task<ParticipantResponse> CreateAsync(Participant participant)
        {
            try
            {
                await _participantRepository.CreateAsync(participant);
                await _unitOfWork.CompleteAsync();
                return new ParticipantResponse(participant);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new ParticipantResponse(
                    $"An error occurred when creating participant: {ex.Message}"
                );
            }
          
        }
    }
}
        