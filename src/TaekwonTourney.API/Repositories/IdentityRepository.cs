﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TaekwonTourney.API.Options;
using TaekwonTourney.Core.DomainObjects;
using TaekwonTourney.Core.DomainObjects.DomainModels;
using TaekwonTourney.Core.Interfaces.RepoInterfaces;
using TaekwonTourney.Core.Models;

namespace TaekwonTourney.API.Repositories
{
    public class IdentityRepository : IIdentityRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtSettings _jwtSettings;

        public IdentityRepository(
            UserManager<User> userManager, 
            JwtSettings jwtSettings)
        {
            _userManager = userManager;
            _jwtSettings = jwtSettings;
        }
        
        public async Task<AuthenticationResult> RegisterAsync(UserRegisterModel userToRegister)
        {
            var existingUser = await _userManager.FindByEmailAsync(userToRegister.Email);
            if (existingUser != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] {"User with this email address already exists"}
                };
            }
            
            existingUser = await _userManager.FindByNameAsync(userToRegister.UserName);
            if (existingUser != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] {"User with this username address already exists"}
                };
            }

            //Will use automapper to reduce lines
            var newUser = new User
            {
                FirstName = userToRegister.FirstName,
                LastName = userToRegister.LastName,
                UserName = userToRegister.UserName,
                Email = userToRegister.Email,
                UserRole = userToRegister.UserRole,
                RegisterDate = DateTime.Now
            };

            var createdUser = await _userManager.CreateAsync(newUser, userToRegister.Password);

            if (!createdUser.Succeeded)
            {
                return new AuthenticationResult
                {
                    Errors = createdUser.Errors.Select(x => x.Description)
                };
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //All information about our user stored in jwt
                Subject = new ClaimsIdentity(new []
                {
                    new Claim(JwtRegisteredClaimNames.Sub, newUser.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, newUser.Email),
                    new Claim("username", newUser.UserName),
                    new Claim("userRole", newUser.UserRole.ToString()),
                    new Claim("firstName", newUser.FirstName),
                    new Claim("lastName", newUser.LastName),
                    new Claim("id", newUser.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials =new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticationResult
            {
                Success = true,
                Token = tokenHandler.WriteToken(token)
            };
        }

        public async Task<AuthenticationResult> LoginAsync(UserLoginModel userToLogin)
        {
            throw new System.NotImplementedException();
        }

        //Might implement later
        public Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken)
        {
            throw new System.NotImplementedException();
        }
    }
}