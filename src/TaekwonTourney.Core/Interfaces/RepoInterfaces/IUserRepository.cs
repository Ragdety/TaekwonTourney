using System.Collections.Generic;

using System.Threading.Tasks;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IUserRepository
    {
        public Task<object> GetUserProfile(int userId);
    }
}   