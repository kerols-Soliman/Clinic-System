using AutoMapper;
using BL.Bases;
using BL.Interface;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class RoleAppServices:BaseAppService
    {

        public RoleAppServices(IUnitOfWork unitOfWork,IMapper mapper):base(unitOfWork,mapper)
        {

        }

        public async Task CreateRole()
        {
            await TheUnitOfWork.RoleRepo.createRole();
            TheUnitOfWork.SaveChanges();
            TheUnitOfWork.CommitTransaction();
        }

        public async Task<IdentityResult> Create(string role)
        {
            return await TheUnitOfWork.RoleRepo.Create(role);
        }



    }
}
