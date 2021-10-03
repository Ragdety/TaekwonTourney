using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaekwonTourney.API.Database;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;

namespace TaekwonTourney.API.Repositories
{
    /// <summary>
    /// This class contains generic CRUD (Create, Read, Update, Delete) operations
    /// for the specified entity.
    /// Use this for data access ONLY.
    /// </summary>
    /// <typeparam name="TEntity">The entity type.</typeparam>
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly ApplicationDbContext _db;

        protected BaseRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public virtual async Task<bool> CreateAsync(TEntity entity)
        {
            await _db.Set<TEntity>().AddAsync(entity);
            var created = await _db.SaveChangesAsync();
            return created > 0;
        }

        public virtual async Task<IEnumerable<TEntity>> FindAllAsync()
        {
            return await _db
                .Set<TEntity>()
                .ToListAsync();
        }

        public virtual async Task<TEntity> FindByIdAsync(object id)
        {
            return await _db
                .Set<TEntity>()
                .FindAsync(id);
        }

        public virtual async Task<bool> UpdateAsync(TEntity entityToUpdate)
        {
            _db.Set<TEntity>().Update(entityToUpdate);
            var updated = await _db.SaveChangesAsync();
            return updated > 0;
        }

        public virtual async Task<bool> DeleteAsync(TEntity entityToDelete)
        {
            _db.Set<TEntity>().Remove(entityToDelete);
            var deleted = await _db.SaveChangesAsync();
            return deleted > 0;
        }
    }
}