using System.Threading.Tasks;

namespace TaekwonTourney.Core.Interfaces.RepoInterfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}