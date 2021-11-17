using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public enum Days
    {
        Saterday,
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday
    }
    public class Doctorschedule
    {
        public int Id { get; set; }
        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }

        [Required]
        public Days DayWork { get; set; }

        [Required]
        public TimeSpan From { get; set; }
        [Required]
        public TimeSpan To { get; set; }


        public Doctor Doctor { get; set; }
        public List<reservation> Reservations { get; set; }
    }
}
