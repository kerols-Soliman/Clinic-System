using BL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interface
{
    public interface IUnitOfWork: IDisposable
    {
        int SaveChanges();
        void BeginTransaction();
        void CommitTransaction();
        void RollbackTransaction();

        DoctorRepository DoctorRepo { get; }
        DoctorscheduleRepository DoctorscheduleRepo { get; }
        ReservationRepository ReservationRepo { get; }
        AccountRespository AccountRespo { get; }
        RoleRepoditory RoleRepo { get; }

    }
}
