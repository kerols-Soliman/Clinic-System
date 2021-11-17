using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ClinicContext:IdentityDbContext<ApplicationIdentityUser>
    {
        public ClinicContext(DbContextOptions option):base(option)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Doctorschedule>().HasMany(ds => ds.Reservations).WithOne(r => r.Doctorschedule).OnDelete(DeleteBehavior.NoAction);

        }


        public DbSet<Doctor> Doctors { set; get; }
        public DbSet<reservation> Reservations{ get; set; }
    } 
}
