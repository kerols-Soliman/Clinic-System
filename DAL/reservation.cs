using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class reservation
    {
        public int Id { get; set; }

        [Required]
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
        [ForeignKey("DoctorscheduleId")]
        public Doctorschedule Doctorschedule { get; set; }
        [ForeignKey("DoctorId")]
        public Doctor Doctor { get; set; }
    }
}
