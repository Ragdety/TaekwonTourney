using System.ComponentModel.DataAnnotations;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.DomainObjects.DomainModels
{
    public class UserRegisterModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole UserRole { get; set; }
        
        //Will add belt level option if is student
    }
}