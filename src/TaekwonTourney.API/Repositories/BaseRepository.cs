using TaekwonTourney.API.Database;

namespace TaekwonTourney.API.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly ApplicationDbContext _db;

        protected BaseRepository(ApplicationDbContext db)
        {
            _db = db;
        }
    }
}