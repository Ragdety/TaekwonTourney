﻿using System;
using TaekwonTourney.Core.Enums;

namespace TaekwonTourney.Core.DomainObjects.DomainModels
{
    public class UserRegisterModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole UserRole { get; set; }
        public DateTime RegisterDate { get; set; }
        
        //Will add belt level option 
    }
}