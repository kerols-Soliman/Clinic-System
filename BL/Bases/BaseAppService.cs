using AutoMapper;
using BL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Bases
{
    public class BaseAppService
    {
        protected IUnitOfWork TheUnitOfWork;
        protected readonly IMapper mapper;

        public BaseAppService(IUnitOfWork unit,IMapper mapper)
        {
            TheUnitOfWork = unit;
            this.mapper = mapper;
        }
        public void Dispose()
        {
            TheUnitOfWork.Dispose();
        }


        public void BeginTransaction()
        {
            TheUnitOfWork.BeginTransaction();
        }
        public void CommitTransaction()
        {
            TheUnitOfWork.CommitTransaction();
        }
        public void RollbackTransaction()
        {
            TheUnitOfWork.RollbackTransaction();
        }
    }
}
