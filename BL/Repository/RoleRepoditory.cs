using BL.Bases;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repository
{
    public class RoleRepoditory:BaseRepository<IdentityRole>
    {
        RoleManager<IdentityRole> _manager;
        public RoleRepoditory(DbContext db, RoleManager<IdentityRole> manager) :base(db)
        {
            _manager = manager;
        }

        public async Task createRole() 
        { 
            if(!await _manager.RoleExistsAsync("Secretary"))
            {
                var x = await _manager.CreateAsync(new IdentityRole() { Name = "Secretary" });
            }
        }
        public async Task<IdentityResult> Create(string role)
        {
            return _manager.CreateAsync(new IdentityRole(role)).Result;
        }

        public List<IdentityRole> getAllRoles()
        {
            return GetAll().ToList();
        }
    }
}
