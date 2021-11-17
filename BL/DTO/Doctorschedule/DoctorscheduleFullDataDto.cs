using DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Doctorschedule
{
    public class DoctorscheduleFullDataDto
    {
        public int Id { get; set; }
        public int DoctorId { get; set; }

        [Required]
        public Days DayWork { get; set; }

        [Required]
        public TimeSpan From { get; set; }
        [Required]
        public TimeSpan To { get; set; }

    }
}
