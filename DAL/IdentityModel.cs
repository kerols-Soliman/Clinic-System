using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ApplicationIdentityUser : IdentityUser
    {
        //public bool IsSecretary { get; set; }
    }
    public class ApplicationUserStory : UserStore<ApplicationIdentityUser>
    {
        //public ApplicationUserStory() : base(new ClinicContext())
        //{

        //}
        public ApplicationUserStory(DbContext db) : base(db)
        {

        }
    }
}
