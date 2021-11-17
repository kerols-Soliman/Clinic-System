using AutoMapper;
using BL.Bases;
using BL.DTO.doctor;
using BL.Interface;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class DoctorAppServices:BaseAppService
    {
        public DoctorAppServices(IUnitOfWork unitOfWork,IMapper mapper):base(unitOfWork,mapper)
        {

        }

        public IEnumerable<DoctorFullDetailsDto> GetAll()
        {
            return mapper.Map<IEnumerable<DoctorFullDetailsDto>>(TheUnitOfWork.DoctorRepo.GetAll());
        }

        public IEnumerable<DoctorWithScheduleDto> GetAllWithSchedule()
        {
            return mapper.Map<IEnumerable<DoctorWithScheduleDto>>(TheUnitOfWork.DoctorRepo.GetAllWithSchedule());
        }


        public DoctorFullDetailsDto GetById(int id)
        {
            return mapper.Map<DoctorFullDetailsDto>(TheUnitOfWork.DoctorRepo.GetById(id));
        }

        public doctorDto Insert(doctorDto dto)
        {
            var doctor = mapper.Map<Doctor>(dto);
            TheUnitOfWork.DoctorRepo.Insert(doctor);
            TheUnitOfWork.SaveChanges();
            return dto;
        }
        
        public bool Update(DoctorFullDetailsDto doctorUpdate)
        {
            var doctor = mapper.Map<Doctor>(doctorUpdate);
            TheUnitOfWork.DoctorRepo.Update(doctor);
            return TheUnitOfWork.SaveChanges() > new int();
        }

        public bool delete(int id)
        {
            TheUnitOfWork.DoctorRepo.Delete(id);
            return TheUnitOfWork.SaveChanges() > new int();
        }
    }
}
