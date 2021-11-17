using BL.Bases;
using DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repository
{
    public class AccountRespository:BaseRepository<ApplicationIdentityUser>
    {
        private UserManager<ApplicationIdentityUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        public AccountRespository(DbContext db, UserManager<ApplicationIdentityUser> userManager, RoleManager<IdentityRole> roleManager):base(db)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        public async Task<IdentityResult> Register(ApplicationIdentityUser registerUser)
        {
            var identityResult = await _userManager.CreateAsync(registerUser, registerUser.PasswordHash);
            return identityResult;
        }

        public async Task<IEnumerable<string>> GetUserRoles(ApplicationIdentityUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            return userRoles;
        }
        public async Task<ApplicationIdentityUser> FindById(string id)
        {
            ApplicationIdentityUser result = await _userManager.FindByIdAsync(id);
            return result;
        }
        public async Task<IdentityResult> AssignToRole(string userId,string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user != null && await _roleManager.RoleExistsAsync(roleName))
            {
                IdentityResult result = await _userManager.AddToRoleAsync(user, roleName);
                return result;
            }
            return null;
        }

        public async Task<ApplicationIdentityUser> Find(string userName,string password)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if(user !=null&& await _userManager.CheckPasswordAsync(user, password))
            {
                return user;
            }
            return null;
        }



    }
}
