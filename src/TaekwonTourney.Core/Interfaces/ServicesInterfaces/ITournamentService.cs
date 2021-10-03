using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaekwonTourney.Models;

namespace TaekwonTourney.Core.Interfaces.ServicesInterfaces
{
	public interface ITournamentService
	{
		public Task<bool> CreateAsync(Tournament entity);
		public Task<IEnumerable<Tournament>> FindAllAsync();
		public Task<Tournament> FindByIdAsync(int id);
		public Task<bool> UpdateAsync(Tournament entityToUpdate);
		public Task<bool> DeleteAsync(Tournament entityToDelete);
	}
}