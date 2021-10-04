using System.Threading.Tasks;
using TaekwonTourney.Core.DomainObjects;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IIdentityRepository
    {
        Task<AuthenticationResult> RegisterAsync(
            string firstName, string lastName, string userName, string email, string password);
        Task<AuthenticationResult> LoginAsync(string emailOrUserName, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);
    }
}