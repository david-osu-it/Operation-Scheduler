using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Operation_Scheduler.Helpers;
using Operation_Scheduler.Models;
using Operation_Scheduler.Repositories;

namespace Operation_Scheduler.Controllers
{
    [ApiController]
    [Route("api/admins")]
    public class AdminsController : ControllerBase
    {
        private IAdminRepository _adminRepository;
        private readonly IUnitOfWork unitOfWork;

        public AdminsController(IAdminRepository AdminRepository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            _adminRepository = AdminRepository;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _adminRepository.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddAdmin([FromBody] Admin admin)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _adminRepository.Add(admin);
            await unitOfWork.CompleteAsync();
            return Ok(admin);

        }

        [Authorize]
        [HttpGet("{adminId}")]
        public IActionResult GetAdmin(int adminId)
        {
            var adminFromRepository = _adminRepository.GetById(adminId);

            if (adminFromRepository == null)
            {
                return NotFound();
            }

            // return Ok(mapper.Map<Appointment>(adminFromRepository));
            return Ok(adminFromRepository);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var admins = _adminRepository.GetAll();
            return Ok(admins);
        }

        [Authorize]
        [HttpDelete("{adminId}")]
        public ActionResult DeleteAdmin(int adminId)
        {
            // if (!repository.CustomerExists(customerID))
            //     return NotFound();

            var adminFromRepo = _adminRepository.GetById(adminId);

            if (adminFromRepo == null)
                return NotFound();

            _adminRepository.Delete(adminFromRepo);
            return NoContent();
        }
    }
}