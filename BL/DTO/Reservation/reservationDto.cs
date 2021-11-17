using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Reservation
{
    public class reservationDto
    {
        public string PatientName { get; set; }

        [Required]
        public string Phone { get; set; }

        [DataType(DataType.Date), Required]
        public DateTime Birthday { get; set; }

        [DataType(DataType.Date), Required]
        public DateTime DateReserve { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }

        public int DoctorId { get; set; }
        public int DoctorscheduleId { get; set; }
        
    }
}
