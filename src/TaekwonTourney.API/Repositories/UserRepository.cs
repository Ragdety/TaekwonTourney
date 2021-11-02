using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaekwonTourney.API.Database;
using TaekwonTourney.API.ViewModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<object> GetUserProfile(int userId)
        {
            var user = await _db.Users
                .Where(x => x.Id.Equals(userId))
                .Select(UserViewModels.ProfileProjection)
                .FirstOrDefaultAsync();

            return user;
        }
    }
}