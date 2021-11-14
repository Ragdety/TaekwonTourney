using System.Threading.Tasks;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Interfaces.ServiceInterfaces;

namespace TaekwonTourney.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<object> GetUserProfile(int userId)
        {
            return await _userRepository.GetUserProfile(userId);
        }
        
        public async Task<object> GetMe(int userId)
        {
            return await _userRepository.GetUserProfile(userId);
        }
    }
}