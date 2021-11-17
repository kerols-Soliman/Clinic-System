using BL.AppServices;
using BL.Bases;
using BL.DTO.Doctorschedule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorscheduleController : ControllerBase
    {
        DoctorscheduleAppServices _doctorscheduleAppServices;
        BaseAppService _baseAppService;
        public DoctorscheduleController(DoctorscheduleAppServices appServices,BaseAppService baseApp)
        {
            _doctorscheduleAppServices = appServices;
            _baseAppService = baseApp;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_doctorscheduleAppServices.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_doctorscheduleAppServices.GetById(id));
        }

        [HttpGet("doctorSchedule/{id}")]
        public IActionResult GetAllByDoctor(int id)
        {
           return Ok(_doctorscheduleAppServices.GetAllByDoctor(id));
        }

        [HttpPost]
        public IActionResult Insert(List<DoctorscheduleDto> dtos)
        {
            _doctorscheduleAppServices.DeleteAll(dtos[0].DoctorId);
            List<DoctorscheduleDto> DoctorscheduleDto=new List<DoctorscheduleDto>();
            foreach(var item in dtos)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                try
                {
                    var inserted = _doctorscheduleAppServices.Insert(item);
                    DoctorscheduleDto.Add(inserted);
                }
                catch (Exception ex)
                {
                    _baseAppService.RollbackTransaction();
                    return BadRequest(new ResponseMessage() { Message = "an error occur" });
                }
            }
            _baseAppService.CommitTransaction();
            return Created("created", DoctorscheduleDto);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteByDoctor(int id)
        {
            _doctorscheduleAppServices.DeleteAll(id);
            _baseAppService.CommitTransaction();
            return Ok(new ResponseMessage() { Message = "Deleted" }); 
        }
    }

}
