using AutoMapper;
using BL.Bases;
using BL.DTO.Doctorschedule;
using BL.Interface;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class DoctorscheduleAppServices:BaseAppService
    {
        public DoctorscheduleAppServices(IUnitOfWork unitOfWork,IMapper mapper):base(unitOfWork,mapper)
        {

        }

        public IEnumerable<DoctorscheduleFullDataDto> GetAllByDoctor(int doctorId)
        {
            return mapper.Map<IEnumerable<DoctorscheduleFullDataDto>>(TheUnitOfWork.DoctorscheduleRepo.GetAllByDoctor(doctorId));
        }

        public IEnumerable<DoctorScheduleWithDoctorDto> GetAll()
        {
            return mapper.Map<IEnumerable<DoctorScheduleWithDoctorDto>>(TheUnitOfWork.DoctorscheduleRepo.GetAllWithDoctorInfo());
        }

        public IEnumerable<DoctorScheduleWithDoctorDto> GetAllByDay(string day)
        {
            return mapper.Map<IEnumerable<DoctorScheduleWithDoctorDto>>(TheUnitOfWork.DoctorscheduleRepo.GetAllByDay(day));
        }

        public DoctorscheduleFullDataDto GetById(int id)
        {
            return mapper.Map<DoctorscheduleFullDataDto>(TheUnitOfWork.DoctorscheduleRepo.GetById(id));
        }

        public DoctorscheduleDto Insert(DoctorscheduleDto dto)
        {
            var scheduales = mapper.Map<Doctorschedule>(dto);
            var schedualesAdded = TheUnitOfWork.DoctorscheduleRepo.Insert(scheduales);
            TheUnitOfWork.SaveChanges();
            return mapper.Map<DoctorscheduleDto>(schedualesAdded);
        }

        public void DeleteAll(int doctorId)
        {
            TheUnitOfWork.DoctorscheduleRepo.DeleteAllSchedualeRelateToDoctor(doctorId);
            TheUnitOfWork.SaveChanges();
        }

    }
}
