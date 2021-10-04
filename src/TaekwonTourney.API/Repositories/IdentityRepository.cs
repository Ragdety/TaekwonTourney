using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Repositories
{
    public class IdentityRepository : IIdentityRepository
    {
        //Will extract parameters into object for register and login
        public async Task<AuthenticationResult> RegisterAsync(string firstName, string lastName, string userName, string email, string password)
        {
            throw new System.NotImplementedException();
        }

        public async Task<AuthenticationResult> LoginAsync(string emailOrUserName, string password)
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