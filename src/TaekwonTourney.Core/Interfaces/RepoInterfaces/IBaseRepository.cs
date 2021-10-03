using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        public Task<bool> CreateAsync(TEntity entity);
        public Task<IEnumerable<TEntity>> FindAllAsync();
        public Task<TEntity> FindByIdAsync(object id);
        public Task<bool> UpdateAsync(TEntity entityToUpdate);
        public Task<bool> DeleteAsync(TEntity entityToDelete);
    }
}