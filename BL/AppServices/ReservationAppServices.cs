using AutoMapper;
using BL.Bases;
using BL.DTO.Reservation;
using BL.Interface;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class ReservationAppServices:BaseAppService
    {
        public ReservationAppServices(IUnitOfWork unitOfWork,IMapper mapper):base(unitOfWork,mapper)
        {

        }
        public IEnumerable<reservationDto> GetAll()
        {
            return mapper.Map<IEnumerable<reservationDto>>(TheUnitOfWork.ReservationRepo.GetAll());
        }
        public IEnumerable<reservationDto> GetAllByDoctorId(int doctorId)
        {
            return mapper.Map<IEnumerable<reservationDto>>(TheUnitOfWork.ReservationRepo.GetAllByDoctorId(doctorId));
        }
        public IEnumerable<reservationDto> GetAllByDoctorIdInRange(int doctorId, DateTime from, DateTime to)
        {
            return mapper.Map<IEnumerable<reservationDto>>(TheUnitOfWork.ReservationRepo.GetAllByDoctorIdInRange(doctorId, from, to));
        }
        public IEnumerable<reservationWithDoctorInfoDto> GetAllByDate(DateTime date)
        {
            return mapper.Map<IEnumerable<reservationWithDoctorInfoDto>>(TheUnitOfWork.ReservationRepo.GetAllByDate(date));
        }

        public reservationDto Insert(reservationDto dto)
        {
            var reserve = mapper.Map<reservation>(dto);
            var reserveInserted = TheUnitOfWork.ReservationRepo.Insert(reserve);
            TheUnitOfWork.SaveChanges();
            return mapper.Map<reservationDto>(reserveInserted);
        }
        public void Delete(int reserveId)
        {
            TheUnitOfWork.ReservationRepo.Delete(reserveId);
            TheUnitOfWork.SaveChanges();
        }
    }
}
