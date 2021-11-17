using BL.AppServices;
using BL.Bases;
using BL.DTO.Account;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace clinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        AccountAppServices _accountAppServices;
        BaseAppService _baseAppService;
        IHttpContextAccessor _httpContextAccessor;
        readonly UserManager<ApplicationIdentityUser> _userManger;
        public AccountController(AccountAppServices accountAppServices,
        IHttpContextAccessor httpContextAccessor, UserManager<ApplicationIdentityUser> userManger,
        BaseAppService baseAppService)
        {
            _accountAppServices = accountAppServices;
            _baseAppService = baseAppService;
            _httpContextAccessor = httpContextAccessor;
            _userManger = userManger;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes ="Bearer")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationIdentityUser user = await _accountAppServices.GetUserById(userId);
            return Ok(user);
        }


        [HttpPost("/register")]
        public async Task<IActionResult> Register(RegiterAccountDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                ApplicationIdentityUser user = await _accountAppServices.Register(dto);
                await _accountAppServices.AssignToRole(user.Id, "Secretary");
                _baseAppService.CommitTransaction();
                return Ok(new ResponseMessage() { Message = "account created" });
            }
            catch(Exception ex)
            {
                _baseAppService.RollbackTransaction();
                return BadRequest(new ResponseMessage() { Message = ex.Message });
            }
        }

        [HttpPost("/login")]
        public async Task<IActionResult> login(LoginDto dto)
        {
            var user = await _accountAppServices.Find(dto.UserName, dto.PasswordHash);
            if(user != null)
            {
                dynamic token = await _accountAppServices.CreateToken(user);
                return Ok(token);
            }
            return Unauthorized();
        }
        
    }
}
