using System.Threading.Tasks;

namespace TaekwonTourney.Core.Interfaces.ServiceInterfaces
{
    public interface IUserService
    {
        Task<object> GetUserProfile(int userId);
        Task<object> GetMe(int userId);
    }
}