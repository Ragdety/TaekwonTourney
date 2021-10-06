using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Repositories
{
    public class IdentityRepository : IIdentityRepository
    {
        
        
        public IdentityRepository()
        {
                
        }
        
        public async Task<AuthenticationResult> RegisterAsync(UserRegisterModel userToRegister)
        {
            throw new System.NotImplementedException();
        }

        public async Task<AuthenticationResult> LoginAsync(UserLoginModel userToLogin)
        {
            throw new System.NotImplementedException();
        }

        //Might implement later
        public Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken)
        {
            throw new System.NotImplementedException();
        }
    }
}