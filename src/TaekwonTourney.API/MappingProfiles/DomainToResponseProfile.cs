using AutoMapper;
using TaekwonTourney.Contracts.v1.Queries;
using TaekwonTourney.Core.DomainObjects.DomainModels.Filters;

namespace TaekwonTourney.API.MappingProfiles
{
    public class DomainToResponseProfile : Profile
    {
        public DomainToResponseProfile()
        {
            CreateMap<GetAllTournamentsQuery, GetAllTournamentsFilter>();
        }
    }
}