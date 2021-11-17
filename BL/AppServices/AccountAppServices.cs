using AutoMapper;
using BL.Bases;
using BL.DTO.Account;
using BL.Interface;
using DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class AccountAppServices:BaseAppService
    {
        IConfiguration _configuration;
        public AccountAppServices(IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper) : base(unitOfWork, mapper)
        {
            this._configuration = configuration;
        }
        public async Task<ApplicationIdentityUser> Register(RegiterAccountDto accountDto)
        {
            ApplicationIdentityUser user = mapper.Map<ApplicationIdentityUser>(accountDto);
            await TheUnitOfWork.AccountRespo.Register(user);
            TheUnitOfWork.SaveChanges();
            return user;
        }

        public async Task<IdentityResult> AssignToRole(string userId,string roleName)
        {
            if (userId == null && roleName == null)
                return null;
            return await TheUnitOfWork.AccountRespo.AssignToRole(userId, roleName);
        }

        public async Task<IEnumerable<string>> GetUserRoles(ApplicationIdentityUser user)
        {
            return await TheUnitOfWork.AccountRespo.GetUserRoles(user);
        }

        public async Task<ApplicationIdentityUser> GetUserById(string userId)
        {
            return await TheUnitOfWork.AccountRespo.FindById(userId);
        }

        public async Task<ApplicationIdentityUser> Find(string name, string password)
        {
            ApplicationIdentityUser user = await TheUnitOfWork.AccountRespo.Find(name, password);
            if (user != null)
                return user;
            return null;
        }


        public async Task<dynamic> CreateToken(ApplicationIdentityUser user)
        {

            var userRoles = await GetUserRoles(user);
            string role = "No Role";
            if (userRoles.FirstOrDefault() != null)
            {
                role = userRoles.FirstOrDefault();
            }

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                   new Claim(ClaimTypes.Role,role),
                   new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };
        }


    }
}
