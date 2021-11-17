using DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Doctorschedule
{
    public class DoctorScheduleWithDoctorDto
    {
        public int Id { get; set; }
        public string DoctorFullName { get; set; }
        public string DoctorPhone{ get; set; }
        public string DoctorTitleDegree{ get; set; }
        public Days DayWork { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }

    }
}
