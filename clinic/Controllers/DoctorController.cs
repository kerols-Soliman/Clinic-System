using BL.AppServices;
using BL.Bases;
using BL.DTO.doctor;
using Microsoft.AspNetCore.Authorization;
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
    public class DoctorController : ControllerBase
    {
        private DoctorAppServices _doctorAppServices;
        private BaseAppService _baseAppService;

        public DoctorController(DoctorAppServices doctorApp, BaseAppService baseApp)
        {
            _doctorAppServices = doctorApp;
            _baseAppService = baseApp;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_doctorAppServices.GetAll());
        }

        [HttpGet("withSchedule")]
        public IActionResult GetAllwithSchedule()
        {
            return Ok(_doctorAppServices.GetAllWithSchedule());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_doctorAppServices.GetById(id));
        }

        [HttpPost]
        public IActionResult Create(doctorDto doctorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var doctor = _doctorAppServices.Insert(doctorDto);
                _baseAppService.CommitTransaction();
                return Created("Doctor Created", doctor);
            }
            catch (Exception ex)
            {
                _baseAppService.RollbackTransaction();
                return BadRequest();
            }
        }
        [HttpPut]
        public IActionResult Put(DoctorFullDetailsDto detailsDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                bool result = _doctorAppServices.Update(detailsDto);
                if (result == true)
                {
                    _baseAppService.CommitTransaction();
                    return Ok(new ResponseMessage() { Message = "Doctor Updated" });
                }
                return BadRequest(new ResponseMessage() { Message = "Doctor Not Updated" });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseMessage() { Message = "Doctor Not Updated" });
            }

        }
        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {
                bool result = _doctorAppServices.delete(Id);
                if(result == true)
                {
                    _baseAppService.CommitTransaction();
                    return Ok(new ResponseMessage() { Message = "Doctor deleted" });
                }
                return BadRequest(new ResponseMessage() { Message = "Doctor Not deleted" });
            }
            catch(Exception ex)
            {
                return BadRequest(new ResponseMessage() { Message = "Doctor Not deleted" });
            }
        }
    }
}
