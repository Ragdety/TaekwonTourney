using System;
using System.Linq.Expressions;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.ViewModels
{
    public class UserViewModels
    {
        public static Expression<Func<User, object>> ProfileProjection =>
            user => new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserName,
                user.UserRole
            };
    }
}