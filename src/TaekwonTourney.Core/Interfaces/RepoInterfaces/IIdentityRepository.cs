using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects;
using TaekwonTourney.Core.DomainObjects.DomainModels;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IIdentityRepository
    {
        Task<AuthenticationResult> RegisterAsync(UserRegisterModel userToRegister);
        Task<AuthenticationResult> LoginAsync(UserLoginModel userToLogin);
        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);
    }
}