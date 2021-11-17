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
    public class ReservationRepository:BaseRepository<reservation>
    {
        public ReservationRepository(DbContext db):base(db)
        {

        }

        public IEnumerable<reservation> GetAllByDoctorId(int doctorId)
        {
            return DbSet.Where(i => i.DoctorId == doctorId).OrderBy(i=>i.DateReserve).ThenBy(i=>i.From).ToList();
        }
        public IEnumerable<reservation> GetAllByDoctorIdInRange(int doctorId, DateTime from, DateTime to)
        {
            return DbSet.Where(i => i.DoctorId == doctorId && i.DateReserve >= from && i.DateReserve <= to).OrderBy(i=>i.DateReserve).ThenBy(i=>i.From).ToList();
        }

        public IEnumerable<reservation> GetAllByDate(DateTime date)
        {
            var x = DbSet.Where(i => i.DateReserve == date).Include(i => i.Doctor).OrderBy(i => i.DateReserve).ThenBy(i=>i.From);
            return x.ToList();
        }


    }
}
