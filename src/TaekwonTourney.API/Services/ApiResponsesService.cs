using TaekwonTourney.Contracts.Responses;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;
using TaekwonTourney.Core.Responses;

namespace TaekwonTourney.API.Services
{
    public class ApiResponsesService : IApiResponsesService
    {
        public ApiGeneralResponse GetNotFoundResponse(string message)
        {
            return new ApiGeneralResponse
            {
                Status = 404,
                Success = false,
                Messages = new []{ message }
            };
        }
        
        public ApiGeneralResponse GetBadRequestResponse(string message)
        {
            return new ApiGeneralResponse
            {
                Status = 400,
                Success = false,
                Messages = new []{ message }
            };
        }
        
        public ApiGeneralResponse GetUnauthorizedResponse(string message)
        {
            return new ApiGeneralResponse
            {
                Status = 401,
                Success = false,
                Messages = new []{ message }
            };
        }
    }
}