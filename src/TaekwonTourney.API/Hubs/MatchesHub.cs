using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TaekwonTourney.API.Hubs
{
    public class MatchesHub : Hub
    {
        public async Task SendMatchUpdate()
        {
            await Clients.All.SendAsync("RefreshMatch");
        }
    }
}