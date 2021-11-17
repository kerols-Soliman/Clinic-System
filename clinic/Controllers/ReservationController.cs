using BL.AppServices;
using BL.Bases;
using BL.DTO.Reservation;
using DAL;
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
    public class ReservationController : ControllerBase
    {
        private ReservationAppServices _reserveAppServices;
        private BaseAppService _baseAppServices;
        public ReservationController(ReservationAppServices reserveAppServices,BaseAppService baseAppServices)
        {
            _reserveAppServices = reserveAppServices;
            _baseAppServices = baseAppServices;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_reserveAppServices.GetAll());
        }

        
        [HttpGet("doctor/{id}")]
        public IActionResult GetAllByDoctor(int id)
        {
            return Ok(_reserveAppServices.GetAllByDoctorId(id));
        }

        [HttpGet("secretary/{date}")]
        public IActionResult GetAllByDate(DateTime date)
        {
            return Ok(_reserveAppServices.GetAllByDate(date));
        }

        [HttpGet("doctor/{id}/{from}/{to}")]
        public IActionResult GetAllByDoctorRange(int id,DateTime from,DateTime to)
        {
            return Ok(_reserveAppServices.GetAllByDoctorIdInRange(id,from,to));
        }

        [HttpPost]
        public IActionResult Insert(reservationDto reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var reserve = _reserveAppServices.Insert(reservation);
                _baseAppServices.CommitTransaction();
                return Created("reservation created", reserve);
            }
            catch(Exception ex)
            {
                _baseAppServices.RollbackTransaction();
                return BadRequest(new ResponseMessage() { Message = "reserve not created" });
            }
        }
        
        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {
                _reserveAppServices.Delete(Id);
                _baseAppServices.CommitTransaction();
                return Ok(new ResponseMessage() { Message = "reserve deleted." });
            }
            catch(Exception ex)
            {
                _baseAppServices.RollbackTransaction();
                return BadRequest(new ResponseMessage() { Message = "reserve not delete." });
            }
        }

    }
}
