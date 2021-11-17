using AutoMapper;
using BL.DTO.Account;
using BL.DTO.doctor;
using BL.DTO.Doctorschedule;
using BL.DTO.Reservation;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Doctor, doctorDto>().ReverseMap();
            CreateMap<Doctor, DoctorFullDetailsDto>().ReverseMap();
            CreateMap<Doctor, DoctorWithScheduleDto>().ReverseMap();
            CreateMap<Doctorschedule, DoctorscheduleFullDataDto>().ReverseMap();
            CreateMap<Doctorschedule, DoctorscheduleFullDataDto>().ReverseMap();
            CreateMap<Doctorschedule, DoctorscheduleDto>().ReverseMap();
            CreateMap<Doctorschedule, DoctorScheduleWithDoctorDto>().ReverseMap();

            CreateMap<reservation, reservationDto>().ReverseMap();
            CreateMap<reservation, reservationWithDoctorInfoDto>().ReverseMap();
            CreateMap<ApplicationIdentityUser, RegiterAccountDto>().ReverseMap();
            CreateMap<ApplicationIdentityUser, LoginDto>().ReverseMap();
        }
    }
}
