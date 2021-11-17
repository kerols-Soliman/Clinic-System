using BL.Bases;
using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repository
{
    public class DoctorRepository : BaseRepository<Doctor>
    {
        public DoctorRepository(DbContext db):base(db)
        {

        }
        public ICollection<Doctor> GetAll()
        {
            return DbSet.OrderBy(d => d.FullName).ToList();
        }
        public ICollection<Doctor> GetAllWithSchedule()
        {
            return DbSet.Include(i=>i.Doctorschedules).OrderBy(d => d.FullName).ToList();
        }

    }
}
