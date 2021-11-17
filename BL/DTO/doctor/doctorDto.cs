using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.doctor
{
    public class doctorDto
    {
        [Required]
        public string FullName { get; set; }

       // [RegularExpression("/d{11}"), Required]
        public string Phone { get; set; }

        //[RegularExpression("/d{14}"), Required]
        public string NationalId { get; set; }

        [Required]
        public string TitleDegree { get; set; }
    }
}
