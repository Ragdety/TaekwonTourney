using System.Threading.Tasks;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;     
        }

        /// <summary>
        /// Saves changes to ApplicationDbContext
        /// </summary>
        public async Task CompleteAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}