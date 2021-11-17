using BL.Interface;
using BL.Repository;
using DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Bases
{
    public class UnitOfWork:IUnitOfWork
    {
        DbContext Context;
        UserManager<ApplicationIdentityUser> _userManager;
        RoleManager<IdentityRole> _roleManager;
        public UnitOfWork(ClinicContext context,
            UserManager<ApplicationIdentityUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            Context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void BeginTransaction()
        {
            Context.Database.CloseConnection();
            if (Context.Database.CurrentTransaction == null)
                Context.Database.BeginTransaction();
        }

        public void CommitTransaction()
        {
            if (Context.Database.CurrentTransaction != null)
                Context.Database.CommitTransaction();
        }
        public void RollbackTransaction()
        {
            if (Context.Database.CurrentTransaction != null)
                Context.Database.RollbackTransaction();
        }
        public void Dispose()
        {
            Context.Dispose();
        }
        public int SaveChanges()
        {
            return Context.SaveChanges();
        }


        private DoctorRepository doctorRepo;
        public DoctorRepository DoctorRepo
        {
            get
            {
                if (doctorRepo == null)
                    doctorRepo = new DoctorRepository(Context);
                return doctorRepo;
            }
        }

        private DoctorscheduleRepository doctorscheduleRepo;
        public DoctorscheduleRepository DoctorscheduleRepo
        {
            get
            {
                if (doctorscheduleRepo == null)
                    doctorscheduleRepo = new DoctorscheduleRepository(Context);
                return doctorscheduleRepo;
            }
        }

        private ReservationRepository reservationRepo;
        public ReservationRepository ReservationRepo
        {
            get
            {
                if (reservationRepo == null)
                    reservationRepo = new ReservationRepository(Context);
                return reservationRepo;
            }
        }
        private AccountRespository accountRespo;
        public AccountRespository AccountRespo
        {
            get
            {
                if (accountRespo == null)
                    accountRespo = new AccountRespository(Context,_userManager,_roleManager);
                return accountRespo;
            }
        }

        private RoleRepoditory roleRepo;
        public RoleRepoditory RoleRepo
        {
            get
            {
                if (roleRepo == null)
                    roleRepo = new RoleRepoditory(Context,_roleManager);
                return roleRepo;
            }
        }

    }
}
