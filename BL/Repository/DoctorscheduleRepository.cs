using BL.Bases;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repository
{
    public class DoctorscheduleRepository: BaseRepository<Doctorschedule>
    {
        public DoctorscheduleRepository(DbContext db):base(db)
        {

        }

        public IEnumerable<Doctorschedule> GetAllByDoctor(int doctorId)
        {
            return DbSet.Where(d => d.DoctorId == doctorId).ToList();
        }

        public IEnumerable<Doctorschedule> GetAllWithDoctorInfo()
        {
            return DbSet.Include(i => i.Doctor).ToList();
        }

        public IEnumerable<Doctorschedule> GetAllByDay(string day)
        {
            return DbSet.Where(d => d.DayWork.ToString() == day).ToList();
        }

        public List<Doctorschedule> InsertList(List<Doctorschedule> doctorschedules)
        {
            foreach(var item in doctorschedules)
            {
                EntityEntry<Doctorschedule> dbEntityEntry = context.Entry(item);
                if (dbEntityEntry.State != EntityState.Detached)
                {
                    dbEntityEntry.State = EntityState.Added;
                }
                else
                {
                    DbSet.Add(item);
                }
            }
            return doctorschedules;


            
        }

        public void DeleteAllSchedualeRelateToDoctor(int doctorId)
        {
            var scheduale = DbSet.Where(d => d.DoctorId == doctorId).ToList();
            DbSet.RemoveRange(scheduale);
        }

    }
}
