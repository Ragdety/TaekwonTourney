using System.Linq;
using Microsoft.AspNetCore.Http;

namespace TaekwonTourney.API.Extensions
{
    public static class HttpContextExtensions
    {
        public static string GetUserId(this HttpContext httpContext)
        {
            return httpContext.User.Claims.Single(x => x.Type == "id").Value;
        }
    }
}