using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Reservation
{
    public class reservationWithDoctorInfoDto
    {
        public string PatientName { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime DateReserve { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public string DoctorFullName { get; set; }

    }
}
