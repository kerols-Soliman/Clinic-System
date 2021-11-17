using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Account
{
    public class RegiterAccountDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required,Compare("PasswordHash")]
        public string ConfirmPassword { get; set; }
    }
}
